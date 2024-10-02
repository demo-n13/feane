import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FoodService } from "./food.service";
import { Food } from "./models";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateFoodDto, UpdateFoodDto } from "./dtos";
import * as multer from "multer";
import * as path from "path";
import { multerConfig } from "@config";
import { Protected } from "@decorators";

@Controller("foods")
export class FoodController {
    #_service: FoodService;

    constructor(service: FoodService) {
        this.#_service = service
    }

    @Get('/:foodId')
    async getFood(@Param('foodId', ParseIntPipe) foodId: number): Promise<Food> {
        return await this.#_service.getFood(foodId)
    }

    @Protected(true)
    @Get('/')
    async getAllFoods(): Promise<Food[]> {
        return await this.#_service.getAllFoods()
    }

    @Post('/add')
    @UseInterceptors(FileInterceptor("image", multerConfig))
    async createFood(@Body() createFoodPayload: CreateFoodDto, @UploadedFile() image: Express.Multer.File): Promise<void> {
        console.log(image, "*", createFoodPayload)
        await this.#_service.createFood({...createFoodPayload, image: image?.filename})
    }

    @Patch('/update/:foodId')
    @UseInterceptors(FileInterceptor("image", multerConfig))
    async updateFood(@Body() updateFoodPayload: UpdateFoodDto, @Param('foodId', ParseIntPipe) foodId: number, @UploadedFile() image: Express.Multer.File): Promise<string | void> {
        await this.#_service.updateFood({...updateFoodPayload, image: image?.filename}, foodId)
    }

    @Delete('/delete/:foodId')
    async deleteFood(@Param('foodId', ParseIntPipe) foodId: number): Promise<string | void> {
        await this.#_service.deleteFood(foodId)
    }

    @Delete('delete')
    async deleteAllFoods(): Promise<string | void> {
        await this.#_service.deleteAllFoods()
    }
}