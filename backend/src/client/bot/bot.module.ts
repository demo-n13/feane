import { CategoryModule, FoodModule, OrderModule } from "@modules";
import { BotService } from "./bot.service";
import { Module } from "@nestjs/common";

@Module({
    providers: [BotService],
    imports: [CategoryModule, FoodModule, OrderModule]

})
export class BotModule{}