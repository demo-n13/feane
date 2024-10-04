import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './models';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  service: CategoryService;

  constructor(service: CategoryService) {
    this.service = service;
  }

  @ApiOperation({ description: 'Barcha categoriesni olish', summary: "Barchasini olish" })
  @Get()
  async getCategories(): Promise<Category[]> {
    return await this.service.getAllCategories();
  }

  @Post('/add')
  async createCategory(
    @Body() createCategoryPayload: CreateCategoryDto,
  ): Promise<Category> {
    return await this.service.createCategory(createCategoryPayload);
  }

  @Put('/edit/:categoryId')
  async updateCategory(
    @Body() updateCategoryPayload: UpdateCategoryDto,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<void> {
    await this.service.updateCategory({
      ...updateCategoryPayload,
      id: categoryId,
    });
  }

  @Delete('/delete/:categoryId')
  async deleteCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<void> {
    await this.service.deleteCategory(categoryId);
  }
}
