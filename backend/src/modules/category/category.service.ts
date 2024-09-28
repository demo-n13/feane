import { InjectModel } from '@nestjs/sequelize';
import { Category } from './schemas';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryModel.findAll();
  }
}
