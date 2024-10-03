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
import { CreateCategoryDto } from './dtos';
import { UpdateCategoryDto } from './dtos/update-category.dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  #_service: CategoryService;

  constructor(service: CategoryService) {
    this.#_service = service;
  }

  @Get('/')
  async getCategories(): Promise<Category[]> {
    return await this.#_service.getAllCategories();
  }

  @Post('/add')
  async createCategory(
    @Body() createCategoryPayload: CreateCategoryDto,
  ): Promise<void | any> {
    try {
      await this.#_service.createCategory(createCategoryPayload);
    } catch (error) {
    //   if(error.name == 'SequelizeUniqueConstraintError'){
    //     return error.name
    //   }
    // console.log(error)
        // new ExceptionHandlerFilter(error)
    }
  }

  @Put('/update/:categoryId')
  async updateCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() updateCategoryPayload: UpdateCategoryDto,
  ): Promise<void> {
    await this.#_service.updateCategory({
      ...updateCategoryPayload,
      id: categoryId,
    });
  }

  @Delete('/delete/:categoryId')
  async deleteCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<void> {
    await this.#_service.deleteCategory(categoryId);
  }
}
