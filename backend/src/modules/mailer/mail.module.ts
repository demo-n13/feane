import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  providers: [MailService],
  exports: [MailService], // Buni eksport qilamiz, Albatta o'tgan safar ancha tushuntirgan edingiz
})
export class MailModule {}