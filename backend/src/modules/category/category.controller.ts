import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './schemas';
import { CreateCtegoryDTO, UpdateCtegoryDTO } from './dtos';

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
  @Post()
  async createCategory(@Body() createCtegoryPayload: CreateCtegoryDTO): Promise<void>{
    return this.#_service.createCategory(createCtegoryPayload)

  }
  @Put("/update/:categoryId")
  async updateCatgeory(@Param('categoryId',ParseIntPipe) categoryId: number, @Body() updateCategory: UpdateCtegoryDTO): Promise<void>{
    return await this.#_service.updateCategory(categoryId,updateCategory)
  }
  @Delete("/delete/:categoryId")
  async deleteCategory(@Param('categoryId',ParseIntPipe) categoryId: number): Promise<void>{
    return await this.#_service.deleteCategory(categoryId)


  }
}
