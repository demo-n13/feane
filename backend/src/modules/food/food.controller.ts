import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { Food } from "./models";
import { FoodService } from "./food.service";
import { CreateFoodDto } from "./dtos";
import { FileInterceptor } from "@nestjs/platform-express";
import * as multer from "multer";
import * as path from "path";

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
    @UseInterceptors(FileInterceptor("image", {
        storage: multer.diskStorage({
            destination(req, file, callback) {
                return callback(null, "./uploads")
            },
            filename: function (req, file, cb) {
                const extName = path.extname(file.originalname)
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                cb(null, file.fieldname + '-' + uniqueSuffix + extName)
            }
        })
    }))
    async createFood(@Body() createFoodPayload: CreateFoodDto, @UploadedFile() image: Express.Multer.File): Promise<void> {
        console.log(image)
        await this.#_service.createFood({ ...createFoodPayload, image: image.filename })
    }
}