import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { appConfig, dbConfig } from '@config';

import { Category, CategoryModule, Food, FoodModule, Order, OrderItem, OrderModule, UploadModule, User, UserModule } from '@modules';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig],
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/uploads',
      rootPath: './uploads',
    }),
    JwtModule.register({
      secret: 'my secret',
      global: true,
      signOptions: {
        expiresIn: 60 * 15,
      },
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        try {
          return {
            dialect: 'postgres',
            host: config.get('database.host'),
            port: config.get<number>('database.port'),
            username: config.get('database.user'),
            password: config.get('database.password'),
            database: config.get('database.dbName'),
            models: [Category, Food, User, Order, OrderItem],
            synchronize: true,
            // sync: {force: true},
            logging: console.log,
            autoLoadModels: true,
          };
        } catch (error) {
          console.log(error);
        }
      },
    }),
    CategoryModule,
    FoodModule,
    UploadModule,
    UserModule,
    OrderModule,
  ],
  providers: [
    {
      useClass: CheckAuthGuard,
<<<<<<< HEAD
      provide: APP_GUARD
    }
  ]
=======
      provide: APP_GUARD,
    },
  ],
>>>>>>> bd0b626c66f6641836f5b6419d68e62fada3486a
})
export class AppModule {}
