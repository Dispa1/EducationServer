import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database.js';

export class Chat extends Model {
  public id!: number;
  public name!: string;
  public isGroupChat!: boolean;
  public creatorId!: { id: string; username: string; fullname: string }[];
  public users!: { id: string; username: string; fullname: string }[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getUserInfoById(id: string): { username: string; fullname: string } | undefined {
    const user = this.users.find(user => user.id === id);
    return user ? { username: user.username, fullname: user.fullname } : undefined;
  }
}

Chat.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  isGroupChat: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  users: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: [],
  },
  creatorId: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: [],
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  sequelize,
  modelName: 'Chat',
});

export default Chat;