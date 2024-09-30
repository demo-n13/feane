import { IsInt, IsString } from "class-validator";
import { UpdateFoodRequest } from "../interfaces";

export class UpdateFoodDto implements Omit<UpdateFoodRequest, "image"> {
    @IsString()
    name?: string;

    @IsString()
    description?: string;

    @IsInt()
    price?: number;

    image: any

    @IsInt()
    categoryId?: number;
}