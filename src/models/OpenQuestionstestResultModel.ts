import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './UserModel';

interface Answer {
  questionId: number;
  questionText: string;
  userAnswer: string;
  correctAnswer: string;
}

class OpenQuestionstestResult extends Model {
  public id!: string;
  public userId!: string;
  public fullname!: string;
  public testId!: string;
  public testName!: string;
  public answers!: Answer[]; 
}

OpenQuestionstestResult.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  testId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  testName: { // Название теста
    type: DataTypes.STRING,
    allowNull: false,
  },
  answers: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'UserTestResult',
});

OpenQuestionstestResult.belongsTo(User, { foreignKey: 'userId' });

export default OpenQuestionstestResult;
