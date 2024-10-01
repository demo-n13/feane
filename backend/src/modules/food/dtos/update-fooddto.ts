import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { UpadteFoodRequst } from '../interfaces';

export class UpdateFoodDto implements Omit<UpadteFoodRequst, 'image'> {
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
