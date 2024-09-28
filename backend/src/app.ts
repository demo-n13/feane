import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig, dbConfig } from './config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category, CategoryModule } from '@modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get('database.host'),
        port: config.get<number>('database.port'),
        username: config.get('database.user'),
        password: config.get('database.password'),
        database: config.get('database.dbName'),
        sync: { alter: true, force: false },
        synchronize: false,
        models: [Category],
        autoLoadModels: true
      }),
      inject: [ConfigService],
    }),

    // // Oddiy ulash
    // SequelizeModule.forRoot({
    //   dialect: 'postgres',
    //   host: process.env.DB_HOST,
    //   port: Number(process.env.DB_PORT),
    //   username: process.env.DB_USER,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    //   autoLoadModels: true,
    //   sync: { alter: true },
    //   synchronize: true,
    //   logging: false,
    // }),
    CategoryModule,
  ],
})
export class AppModule {}
