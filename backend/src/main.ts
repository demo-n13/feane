import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)

  // SET GLOBAL PREFIX
  app.setGlobalPrefix('/api/v1')

  // SWAGGER OPEN API
  const config = new DocumentBuilder()
  .setTitle('Feane Restaurant Api')
  .setDescription('The Feane Api Description')
  .setVersion('1.0')
  .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)

  // USE MORGAN IN DEVELOPMENT MODE
  if(process.env.NODE_ENV?.trim() == 'development'){
    app.use(morgan('tiny'))
  }

  await app.listen(configService.get<number>('appConfig.port'), () => {
    console.log(`Listening on ${configService.get<number>('appConfig.port')}`);
  });
}
bootstrap();
