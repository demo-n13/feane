import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // Gmail xizmatidan foydalanamiz
      auth: {
        user: 'mehriddinamonboyev1@gmail.com', // Gmail manzilingiz
        pass: 'Mehriddin',  // Gmail parolingiz yoki app password
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'mehriddinamonboyev1@gmail.com',
      to: to,
      subject: subject,
      text: text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email muvaffaqiyatli yuborildi');
    } catch (error) {
      console.error('Email yuborishda xato:', error);
    }
  }
}
