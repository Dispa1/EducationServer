import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class News extends Model {
  public id!: string;
  public name!: string;
  public image!: string | null;
  public text!: string;
  public type!: string;

}

News.init({
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
  image: {
    type: DataTypes.STRING
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'News',
});

export default News;
