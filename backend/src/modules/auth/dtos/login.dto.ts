import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { LoginRequest } from "../interfaces";

export class LoginDto implements LoginRequest{

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    
}