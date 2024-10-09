import { Category, User } from '@modules';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createReadStream } from 'fs';
import { Action, Command, Ctx, On, Start, Update } from 'nestjs-telegraf';
import * as path from 'path';
import { Context, SessionStore } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';
import * as opencage from 'opencage-api-client';

export declare interface ContextInterface extends Context {
  session: {
    name: string | undefined;
    telegramId: number | undefined;
    email: string | undefined;
    phone: string | undefined;
    registration_state: boolean;
  };
}

@Injectable()
@Update()
export class BotService {
  constructor(
    @InjectModel(Category) private categoryModel: typeof Category,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  @Action('start')
  @Start()
  async startBot(@Ctx() context: ContextInterface) {
    const userData = context.message.from;
    context.session.telegramId = userData.id;
    context.session.name = `${userData.first_name} ${userData.last_name}`;

    // check if user is already exists
    const foundedUser = await this.userModel.findOne({
      where: { telegram_id: userData.id },
    });

    if (!foundedUser) {
      context.session.registration_state = true;
      await this.#_askPhone(context);
      return;
    }

    const imagepath = path.join(
      __dirname,
      '../../../',
      'public',
      'images',
      'restaurant.jpg',
    );
    await context.replyWithPhoto(
      { source: createReadStream(imagepath) },
      {
        caption: 'Feane restorani',
        reply_markup: {
          inline_keyboard: [
            [
              { callback_data: 'start', text: 'Start command' },
              { callback_data: 'help', text: 'Help command' },
            ],
            [{ callback_data: 'categories', text: 'Taom turlari' }],
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      },
    );
  }

  @Action('help')
  @Command('help')
  async helpCommand(@Ctx() context: Context): Promise<void> {
    context.replyWithHTML(`<b>Botdagi komandalar:</b>
        <i>start - botni qayta ishga tushirish</i>
        <i>help - botdagi komandalarni ko'rish</i>
        `);
  }

  @Action("email-ulashish")
  async getEmail(@Ctx() context: ContextInterface) : Promise<void> {
    const message = context.message;
    console.log(message)

    await context.sendMessage("Emailni kirit:", {reply_markup: {
      inline_keyboard: []
    }})
  }

  @On('location')
  async catchLocation(@Ctx() context: Context): Promise<void> {
    const message = context.message as Message.LocationMessage;
    console.log(message.location);

    opencage
      .geocode({
        q: `${message.location.latitude}, ${message.location.longitude}`,
        language: 'en',
        key: 'f29a6964d8da48429831c92cb5b756e0',
      })
      .then((data) => {
        // console.log(JSON.stringify(data));
        if (data.status.code === 200 && data.results.length > 0) {
          const place = data.results[0];
          console.log(place);
          console.log(place.formatted);
          console.log(place.components.road);
          console.log(place.annotations.timezone.name);
        } else {
          console.log('status', data.status.message);
          console.log('total_results', data.total_results);
        }
      });

    await context.reply('Location saqlandi');
  }

  @On("contact")
  async catchPhone(@Ctx() context: ContextInterface): Promise<void> {
    const message = context.message as Message.ContactMessage;

    context.session.phone = message.contact.phone_number;

    if (!context.session.email) {
      await this.#_askEmail(context);
    }
  }

  @Action('categories')
  async showCategories(@Ctx() context: Context): Promise<void> {
    const allCategories = await this.categoryModel.findAll();

    let categoriesBtns: { callback_data: string; text: string }[][] = [];

    for (const ct of allCategories) {
      categoriesBtns.push([
        {
          callback_data: `${ct.id}-${ct.name}`,
          text: ct.name,
        },
      ]);
    }

    const imagepath = path.join(
      __dirname,
      '../../../',
      'public',
      'images',
      'categories.jpg',
    );

    await context.replyWithPhoto(
      {
        source: createReadStream(imagepath),
      },
      {
        reply_markup: {
          inline_keyboard: categoriesBtns,
          one_time_keyboard: true,
        },
      },
    );
  }

  async #_askPhone(context: Context): Promise<void> {
    await context.reply(
      "Siz ro'yhatdan o'tmagansiz. Telefon nomeringizni kiriting! (format: +998931234567)",
      {
        reply_markup: {
          keyboard: [[{ request_contact: true, text: 'Nomer ulashish' }]],
          one_time_keyboard: true,
        },
      },
    );
  }

  async #_askEmail(context: Context): Promise<void> {
    await context.reply(
      "Siz ro'yhatdan to'liq o'tmagansiz. Emailingizni kiriting!",
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Email ulashish', callback_data: 'email-ulashish' }],
          ],
        },
      },
    );
  }
}
