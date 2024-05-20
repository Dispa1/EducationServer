import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

interface Subsection {
  id: string;
  name: string;
  image: string;
  text: string;
}

class Course extends Model {
  public id!: string;
  public title!: string;
  public description!: string;
  public image!: string;
  public subSections!: Subsection[];

}

Course.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  subSections: {
    type: DataTypes.ARRAY(DataTypes.JSONB),
    allowNull: false,
    defaultValue: []
  }
}, {
  sequelize,
  modelName: 'Course',
});

export default Course;
