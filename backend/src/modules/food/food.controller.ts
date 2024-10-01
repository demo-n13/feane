import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { Food } from './models/food.models';
import { CreateFoodDto } from './dtos/create-food.dtos';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateFoodDto } from './dtos/update-fooddto';

@Controller('foods')
export class FoodController {
  #_service: FoodService;

  constructor(service: FoodService) {
    this.#_service = service;
  }



  @Get()
  async getAllFoods(): Promise<Food[]> {
    return await this.#_service.getAllFoods();
  }

  @Get('/:id')
  async getFoodById(@Param('id') id: number): Promise<Food> {
    return await this.#_service.getFoodById(id);
  }

  @Post('/add')
  @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
  async createFood(
    @Body() createFoodPayload: CreateFoodDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    await this.#_service.createFoods({
      ...createFoodPayload,
      image: image.filename,
    });
  }

  @Put('/update/:id')
  @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
  async updateFood(
    @Param('id') id: number,
    @Body() updateFoodPayload: UpdateFoodDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<void> {
    const updateData = {
      ...updateFoodPayload,
    };

    if (image) {
      updateData['image'] = image.filename;
    }

    await this.#_service.updateFood(id, updateData);
  }

  @Delete('/delete/:id')
  async deleteFood(@Param('id') id: number): Promise<void> {
    await this.#_service.deleteFood(id);
  }
}
