import { IsInt, isInt, IsNotEmpty, IsString } from "class-validator";
import { CreateFoodRequest } from "../interfaces";

export class CreateFoodDto implements Omit<CreateFoodRequest, "image"> {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsInt()
    @IsNotEmpty()
    price: number;

    image: any;

    @IsInt()
    @IsNotEmpty()
    categoryId: number;
}