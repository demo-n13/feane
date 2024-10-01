import { IsNotEmpty, IsString } from "class-validator";
import { CreateCategoryRequest } from "../interfaces";

export class CreateCategoryDto implements CreateCategoryRequest {
    @IsString()
    @IsNotEmpty()
    name: string;
}