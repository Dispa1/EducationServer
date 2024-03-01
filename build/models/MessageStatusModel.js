import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database.js';
import { Message } from './MessageModel.js';
export class UserMessageStatus extends Model {
}
UserMessageStatus.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    messageId: {
        type: DataTypes.INTEGER,
        references: {
            model: Message,
            key: 'id',
        },
        allowNull: false,
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    modelName: 'UserMessageStatus',
});
export default UserMessageStatus;
//# sourceMappingURL=MessageStatusModel.js.map