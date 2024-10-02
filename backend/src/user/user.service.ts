import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private userModel: typeof UserModel,

  ) { }

  createUser(createUserDto: CreateUserDto) {

    try {

      const admin = await this.userModel.create({
        phone: createUserDto.phone,
        email: createUserDto.email,
        image: createUserDto.image,
      });
      return {
        statusCode: 201,
        message: 'success',
        data: admin,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
