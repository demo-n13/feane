import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { Action, Command, Ctx, Start, Update } from 'nestjs-telegraf';
import * as path from 'path';
import { Context } from 'telegraf';

@Injectable()
@Update()
export class BotService {
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
        one_time_keyboard: true
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
}
