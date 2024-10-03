import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models';
import { CreateUserRequest, UpdateUserRequest } from './interfaces';
import { UploadFileResponse, UploadService } from '../upload';
// import { Order } from '../order';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private uploadService: UploadService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userModel
      .findAll
      // {include: Order,}
      ();
  }

  async createUser(payload: CreateUserRequest): Promise<void> {
    let imageUrl: null | UploadFileResponse = null;

    if (payload?.image) {
      imageUrl = await this.uploadService.uploadFile({
        destination: 'uploads',
        file: payload.image,
      });
    }

    // console.log(imageUrl)
    await this.userModel.create({
      name: payload.name,
      password: payload.password,
      phone: payload.phone,
      email: payload.email,
      image: imageUrl ? imageUrl?.imageUrl : '',
    });
  }

  async updateUser(userId: number, payload: UpdateUserRequest): Promise<void | string> {
    const selectedUser = await this.userModel.findByPk(userId);
    // console.log(selectedUser)
    if (!selectedUser) {
      return `Food not found`;
    }
    // console.log(process.cwd(), payload.image)

    // console.log(payload.image, "*")

    let imageUrl: null | UploadFileResponse = null;

    if (payload?.image) {
      imageUrl = await this.uploadService.uploadFile({
        destination: 'uploads',
        file: payload.image,
      });
    }
    await this.userModel.update(
      {
        name: payload.name,
        description: payload.password,
        phone: payload.phone,
        email: payload.email,
        image: imageUrl ? imageUrl?.imageUrl : '',
      },
      {
        where: { id: userId },
      },
    );


    await this.uploadService.removeFile({ fileName: selectedUser?.image });
    // unlink(
    //   join(process.cwd(), 'uploads', selectedFood?.dataValues?.image),
    //   (err) => {
    //     if (err) {
    //       console.log("Fayl mavjud emas yoki fayl o'chirishda xatolik");
    //     }
    //   },
    // );
  }

  async deleteUser(userId: number): Promise<void> {
    const foundedUser = await this.userModel.findByPk(userId);

    console.log(foundedUser.image);
    if (foundedUser?.image) {
      await this.uploadService.removeFile({ fileName: foundedUser?.image });
    }

    await this.userModel.destroy({ where: { id: userId } });
  }
}
