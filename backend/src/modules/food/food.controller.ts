import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FoodService } from "./food.service";
import { Food } from "./models";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateFoodDto, UpdateFoodDto } from "./dtos";
import * as multer from "multer";
import * as path from "path";

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

    @Get('/')
    async getAllFoods(): Promise<Food[]> {
        return await this.#_service.getAllFoods()
    }

    @Post('/add')
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
        // console.log(image)
        await this.#_service.createFood({...createFoodPayload, image: image.filename})
    }

    @Patch('/update/:foodId')
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
    async updateFood(@Body() updateFoodPayload: UpdateFoodDto, @Param('foodId', ParseIntPipe) foodId: number, @UploadedFile() image: Express.Multer.File): Promise<string | void> {
        await this.#_service.updateFood({...updateFoodPayload, image: image.filename}, foodId)
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