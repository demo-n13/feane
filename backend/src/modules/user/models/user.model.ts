import { Table, Column, DataType, Model } from "sequelize-typescript";
interface UserAttributes {

    name: string;
    phone: string
    email: string
    image: string
}


@Table({ tableName: 'admin' })
export class UserModel extends Model<UserModel, UserAttributes> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
  })
  image: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;
}