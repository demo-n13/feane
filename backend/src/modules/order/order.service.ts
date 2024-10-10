import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order, OrderItem } from './models';
import { CreateOrderRequest } from './interfaces';
import { Food } from '../food';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
    @InjectModel(Food) private foodModel: typeof Food,
    @InjectModel(OrderItem) private orderItemModel: typeof OrderItem,
    private sequelize: Sequelize
  ) {}

  async getAllOrders(): Promise<Order[]> {
    return await this.orderModel.findAll({
      include: [OrderItem],
    });
  }

  async createOrder(payload: CreateOrderRequest): Promise<void> {
    const transaction = await this.sequelize.transaction();

    try {
      const order = await this.orderModel.create({
        total_price: payload.totalPrice,
        user_id: payload.userId,
      }, {transaction});
  
      for (const orIt of payload.orderItems) {
        const food = await this.foodModel.findByPk(orIt.foodId);
        console.log(orIt, "testtttttt")
        await this.orderItemModel.create({
          food_id: orIt.foodId,
          order_id: order.id,
          quantity: Number(orIt.quantity),
          total_price: Number(orIt.quantity) * Number(food.price),
        }, {transaction});
      }
  
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw new InternalServerErrorException(error?.message)
    }
  }
  async deleteOrder(id: number): Promise<void> {
    await this.orderModel.destroy({
      where: {
        id,
      },
    });
  }
}
