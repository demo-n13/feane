import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './schemas';

@Controller('categories')
export class CategoryController {
  #_service: CategoryService;

  constructor(service: CategoryService) {
    this.#_service = service;
  }

  @Get()
  async getCategories(): Promise<Category[]> {
    return await this.#_service.getAllCategories();
  }
}
