import { InjectModel } from '@nestjs/sequelize';
import { Category } from './schemas';
import { Injectable } from '@nestjs/common';
import { createCategoryRequest } from './interfaces';
import { UpdateCtegoryDTO } from './dtos';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryModel.findAll();
  }
  async createCategory(payload: createCategoryRequest):Promise<void>{
    await this.categoryModel.create({
      name: payload.name
    })
  }
  async updateCategory(id: number,category: UpdateCtegoryDTO): Promise<void>{
    await this.categoryModel.update(category,{
      where:{id}
    })
  }

  async deleteCategory(id: number): Promise<void>{
    await this.categoryModel.destroy({
      where: {
        id
      }
    })
  }
  
}
