import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Food } from './models';
import { CreateFoodRequest, UpdateFoodRequest } from './interfaces';
import { unlink } from 'fs';
import { join } from 'path';

@Injectable()
export class FoodService {
  constructor(@InjectModel(Food) private foodModel: typeof Food) {}

  async getFood(foodId: number): Promise<Food> {
    return await this.foodModel.findByPk(foodId)
  }

  async getAllFoods(): Promise<Food[]> {
    return await this.foodModel.findAll();
  }

  async createFood(payload: CreateFoodRequest): Promise<void> {
    // console.log(payload.image)
    await this.foodModel.create({
      name: payload.name,
      description: payload.description,
      price: payload.price,
      image: payload.image,
      category_id: payload.categoryId,
    });
  }

  async updateFood(payload: UpdateFoodRequest, foodId: number): Promise<string | void> {
    const selectedFood = await this.getFood(foodId)
    // console.log(selectedFood)
    if(!selectedFood){
        return `Food not found`
    }
    // console.log(process.cwd(), payload.image)
    
    // console.log(payload.image, "*")
    await this.foodModel.update(
      {
        name: payload.name,
        description: payload.description,
        price: payload.price,
        image: payload.image,
        category_id: payload.categoryId,
      },
      {
        where: { id: foodId },
      },
    );

    // // Atiylab eng pasda fayl o'chirildi. Chunki name property unique bo'lgani uchun bir xil nom kiritganda xatolik
    // // bersa fayl o'chib ketmasligi uchun ya'ni birinchi ma'lumotni update qilib bo'lib keyin faylni o'chiramiz
    // // try catchga olib yozilmasa baribir faylni o'chirvordi lekin fayl nomi bazada qolib ketdi
    unlink(join(process.cwd(), 'uploads', selectedFood?.dataValues?.image), (err) => {
        if (err) {
            console.log("Fayl mavjud emas yoki fayl o'chirishda xatolik");
          }
    })
  }

  async deleteFood(foodId: number): Promise<string | void> {
    const selectedFood = await this.getFood(foodId)
    // console.log(selectedFood)
    if(!selectedFood){
        return `Food not found`
    }
    // console.log(process.cwd(), payload.image)
    unlink(join(process.cwd(), 'uploads', selectedFood?.dataValues?.image), (err) => {
        if (err) {
            console.log("Fayl mavjud emas yoki fayl o'chirishda xatolik");
          }
    })
    await selectedFood.destroy()
  }

  async deleteAllFoods(): Promise<string | void> {
    const deletedFoodImages = await this.foodModel.findAll({attributes: ['image']})
    if(!deletedFoodImages){
        return `Food not found`
    }
    await this.foodModel.truncate()
    deletedFoodImages.forEach(f => {
        unlink(join(process.cwd(), 'uploads', f?.dataValues?.image), (err) => {
            if (err) {
                console.log("Fayl mavjud emas yoki fayl o'chirishda xatolik");
              }
        })
    })
  }
}