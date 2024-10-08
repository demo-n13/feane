// src/app.controller.ts
import { Body, Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailSenderDto } from './dto/email-send.dto';
import { generateOTP } from './otp';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('send-email')
  async sendEmail(
    @Body() payload: EmailSenderDto,
  ) {
    const otp = generateOTP()
    await this.emailService.sendMail(
      payload.email,
      'Your OTP Code', 
      `Your OTP code is: ${otp}` 
    );
    return 'Email jo‘natildi!'; 
  }

  
}


