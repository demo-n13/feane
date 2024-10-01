import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Food } from "./models";
import { CreateFoodRequest } from "./interfaces";

@Injectable()
export class FoodService {
    constructor(@InjectModel(Food) private foodModel: typeof Food) { }

    async getAllFoods(): Promise<Food[]> {
        return await this.foodModel.findAll()
    }

    async createFood(payload: CreateFoodRequest): Promise<void> {
        await this.foodModel.create({
            name: payload.name,
            description: payload.description,
            price: payload.price,
            image: payload.image,
            category_id: payload.categoryId
        })
    }
}