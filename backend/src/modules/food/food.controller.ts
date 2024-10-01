import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { Food } from "./models";
import { FoodService } from "./food.service";
import { CreateFoodDto } from "./dtos";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerConfig } from "@config";

@Controller("foods")
export class FoodController {
    #_service: FoodService;

    constructor(service: FoodService) {
        this.#_service = service
    }

    @Get()
    async getAllFoods(): Promise<Food[]> {
        return await this.#_service.getAllFoods()
    }

    @Post("/add")
    @UseInterceptors(FileInterceptor("image", multerConfig))
    async createFood(@Body() createFoodPayload: CreateFoodDto, @UploadedFile() image: Express.Multer.File): Promise<void> {
        console.log(image)
        await this.#_service.createFood({ ...createFoodPayload, image: image.filename })
    }
}