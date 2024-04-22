import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class Role extends Model {
  public id!: number;
  public name!: string;
}

Role.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'Role',
});

export default Role;
