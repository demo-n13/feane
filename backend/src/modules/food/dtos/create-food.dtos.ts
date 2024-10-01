import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { CreateFoodRequst } from '../interfaces';

export class CreateFoodDto implements Omit<CreateFoodRequst, 'image'> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  price: number;
  image: string;

  @IsInt()
  @IsNotEmpty()
  category_id: number;
}
