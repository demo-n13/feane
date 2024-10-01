import { IsNotEmpty, IsString } from "class-validator";
import { createCategoryRequest } from "../interfaces";

export class CreateCtegoryDTO  implements  createCategoryRequest{
    @IsString()
    @IsNotEmpty()
    name: string;

}