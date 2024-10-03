export declare interface CreateUserRequest {
  name: string;
  password: string;
  phone: string;
  email: string;
  image?: Express.Multer.File;
}
