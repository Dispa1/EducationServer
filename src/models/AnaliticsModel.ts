import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Analytics extends Model {
  public id!: string;
  public type!: string;
  public userId!: string;
  public correctAnswersCount!: number;
  public incorrectAnswersCount!: number;
  public unansweredQuestionsCount!: number;
  public testId!: string;
  public testName!: string;
  public userName!: string;
}

Analytics.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  userName: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  testId: { 
    type: DataTypes.UUID,
    allowNull: false,
  },
  testName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correctAnswersCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0 
  },
  incorrectAnswersCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0 
  },
  unansweredQuestionsCount: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0 
  }
}, {
  sequelize,
  modelName: 'Analytics',
});

export default Analytics;
