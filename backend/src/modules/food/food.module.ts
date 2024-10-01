import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Food } from "./models";
import { FoodService } from "./food.service";
import { FoodController } from "./food.controller";

@Module({
    imports: [SequelizeModule.forFeature([Food])],
    providers: [FoodService],
    controllers: [FoodController]
})
export class FoodModule { }