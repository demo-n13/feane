import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models';
import { UploadService } from '../upload';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService, UploadService],
  controllers: [UserController],
})
export class UserModule {}
