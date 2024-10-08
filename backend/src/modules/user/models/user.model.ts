import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Order, Review } from '@modules';

export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user',
}

@Table({ tableName: 'users', timestamps: true })
export class User extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.TEXT, allowNull: false, unique: true })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  phone: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  email: string;

  @Column({ type: DataType.ENUM, allowNull: false,defaultValue : UserRoles.USER })
  role: UserRoles;

  @Column({ type: DataType.TEXT, allowNull: true})
  image?: string;

  @HasMany(() => Order)
  orders: Order[]

  @HasMany(() => Review)
  reviews: Review[]
}
