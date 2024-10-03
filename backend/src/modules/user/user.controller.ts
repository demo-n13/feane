import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './models';
import { UserService } from './user.service';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Protected } from '@decorators';

@ApiTags('Users')
@Controller('/users')
export class UserController {
  constructor(private service: UserService) {}

  @Protected(false)
  @ApiOperation({ summary: 'Barcha userlarni olish' })
  @Get('/')
  async getAllUsers(): Promise<User[]> {
    return await this.service.getAllUsers();
  }

  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'User yaratish' })
  @Post('/add')
  @UseInterceptors(FileInterceptor('image'))
  async createUser(
    @Body() payload: CreateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    await this.service.createUser({ ...payload, image });
  }

  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'User yangilash' })
  @Patch('update/:userId')
  @UseInterceptors(FileInterceptor('image'))
  async updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() payload: UpdateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    await this.service.updateUser(userId, { ...payload, image });
  }

  @Delete('/delete/:userId')
  @ApiOperation({ summary: "Userni o'chirish" })
  async deleteUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    await this.service.deleteUser(userId);
  }
}
