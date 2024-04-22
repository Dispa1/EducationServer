import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class User extends Model {
  public id!: string;
  public username!: string;
  public full_name!: string;
  public email!: string;
  public password!: string;
  public is_disabled!: boolean;
  public image!: string;
  public role!: { id: number, name: string };

  public created_at!: Date;
  public updated_at!: Date;
}

User.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  image: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: { id: 2, name: 'user' }
  }
}, {
  sequelize,
  modelName: 'User',
});

export default User;
