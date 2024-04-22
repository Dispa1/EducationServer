import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

interface Option {
    id: number;
    text: string;
    isCorrect: boolean;
}

interface Question {
    id: number;
    questionText: string;
    options: Option[];
}

class ClosedQuestionTestModel extends Model {
    public id!: string;
    public name!: string;
    public description!: string;
    public time!: number;
    public test!: Question[];
}

ClosedQuestionTestModel.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    time: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    test: {
        type: DataTypes.JSONB,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'ClosedQuestionTestModel',
});

export default ClosedQuestionTestModel;
