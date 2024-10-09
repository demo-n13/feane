import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models";
import { Order } from "../order";
import { Review } from "../review";

@Injectable()
export class MeService {
    constructor(@InjectModel(User) private userModel: typeof User) {}

    async getMe(userId: number) : Promise<User> {
        return await this.userModel.findByPk(userId, {include: [Order, Review]})
    }     
}