import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'smtp.gmail.com', 
      auth: {
        user: 'jaloliddinov008@gmail.com', 
        pass: 'Ravshan_N48', 
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'jaloliddinov008@gmail.com',
      to,
      subject: 'Welcome to Our Service!',
      text,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email jo‘natildi:', info);
    } catch (error) {
      console.error('Email jo‘natishda xatolik:', error);
    }

    async conifirmOtp(email: string){
      const 
    }
  }
}
