import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Order } from './order.model';
import { Food } from '@modules';

@Table({ tableName: 'order-items', timestamps: true })
export class OrderItem extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  total_price: number;

  @Column({ type: DataType.INTEGER, defaultValue: 1 })
  quantity: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  order_id: number;

  @ForeignKey(() => Food)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  food_id: number;

  @BelongsTo(() => Food)
  food: Food
}
