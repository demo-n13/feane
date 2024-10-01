import { IsNotEmpty, IsString } from "class-validator";
import { UpdateCategoryRequest } from "../interfaces";

export class UpdateCategoryDto implements Omit<UpdateCategoryRequest, "id"> {
    @IsString()
    @IsNotEmpty()
    name: string;
}