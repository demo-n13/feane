import { Injectable, Param } from '@nestjs/common';
import { Food } from './models/food.models';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFoodRequst, UpadteFoodRequst } from './interfaces';
import { UpdateFoodDto } from './dtos/update-fooddto';
import { where } from 'sequelize';
// import { UpadteFoodRequst } from './interfaces/update-foods.interfaces';

@Injectable()
export class FoodService {
  constructor(@InjectModel(Food) private foodModel: typeof Food) {}

  async getAllFoods(): Promise<Food[]> {
    return await this.foodModel.findAll();
  }

  async getFoodById(id: number): Promise<Food> {
    return await this.foodModel.findOne({ where: { id } });
  }

  async createFoods(payload: CreateFoodRequst): Promise<void> {
    await this.foodModel.create({
      name: payload.name,
      description: payload.description,
      price: payload.price,
      image: payload.image,
      category_id: payload.category_id,
    });
  }

  // async createFoods(payload: CreateFoodRequst): Promise<void> {
  //   await this.foodModel.create({
  //     name: payload.name,
  //     description: payload.description,
  //     price: payload.price,
  //     image: payload.image,
  //     category_id: payload.category_id,
  //   });
  // }

  async updateFood(id: number, payload: UpadteFoodRequst): Promise<void> {
    await this.foodModel.update(payload, {
      where: { id },
    });
  }

  async deleteFood(id: number): Promise<void> {
    await this.foodModel.destroy({
      where: { id },
    });
  }
}
