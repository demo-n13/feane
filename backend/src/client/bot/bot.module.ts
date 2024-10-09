import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Category, User } from "@modules";

@Module({
    imports: [SequelizeModule.forFeature([Category, User])],
    providers: [BotService],
})
export class BotModule {}