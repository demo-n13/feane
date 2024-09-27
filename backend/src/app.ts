import { Module } from '@nestjs/common';
import { appConfig, dbConfig } from './config';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig]
    })
  ],
})
export class AppModule {}
