import { IsNotEmpty, IsString, IsOptional, IsEmail} from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty()
    phone: string

    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    image: string
}
