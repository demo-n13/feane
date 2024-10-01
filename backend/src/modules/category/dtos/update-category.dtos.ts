import { IsNotEmpty, IsString } from "class-validator";
import { createCategoryRequest } from "../interfaces";

export class UpdateCtegoryDTO  implements  createCategoryRequest{
    @IsString()
    @IsNotEmpty()
    name: string;

}