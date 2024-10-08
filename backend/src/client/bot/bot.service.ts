import { Category } from '@modules';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createReadStream } from 'fs';
import { Action, Command, Ctx, On, Start, Update } from 'nestjs-telegraf';
import * as path from 'path';
import { Context } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';
import * as opencage from "opencage-api-client";


@Injectable()
@Update()
export class BotService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}
  @Action('start')
  @Start()
  async startBot(@Ctx() context: Context) {
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
          // keyboard: [
          //     [{text: "Phone", request_contact: true}, {text: "Location", request_location: true}]
          // ],
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

  @On("location")
  async catchLocation(@Ctx() context: Context): Promise<void> {
    const message= context.message as Message.LocationMessage;
    console.log(message.location)

    opencage
  .geocode({ q: `${message.location.latitude}, ${message.location.longitude}`, language: 'en', key: "f29a6964d8da48429831c92cb5b756e0" })
  .then((data) => {
    // console.log(JSON.stringify(data));
    if (data.status.code === 200 && data.results.length > 0) {
      const place = data.results[0];
      console.log(place)
      console.log(place.formatted);
      console.log(place.components.road);
      console.log(place.annotations.timezone.name);
    } else {
      console.log('status', data.status.message);
      console.log('total_results', data.total_results);
    }
  })


    await context.reply("Location saqlandi")
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
        source: createReadStream(imagepath)
      },
      { reply_markup: { inline_keyboard: categoriesBtns, one_time_keyboard: true } },
    );
  }
}
