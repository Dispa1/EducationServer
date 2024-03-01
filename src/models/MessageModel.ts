import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database.js';
import { Chat } from './ChatModel.js';

export class Message extends Model {
  public id!: number;
  public chatId!: number;
  public chatName?: string;
  public participantName?: string;
  public userId!: string;
  public content?: string;
  public image?: string;
  public file?: string;
  public voiceMessage?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Message.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  chatId: {
    type: DataTypes.INTEGER,
    references: {
      model: Chat,
      key: 'id',
    },
    allowNull: false,
  },
  chatName: {
    type: DataTypes.STRING,
    references: {
      model: Chat,
      key: 'name',
    },
    allowNull: true,
  },
  participantName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  file: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  voiceMessage: {
    type: DataTypes.STRING,
    allowNull: true,
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
  modelName: 'Message',
});

export default Message;
