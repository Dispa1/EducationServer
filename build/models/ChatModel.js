import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database.js';
export class Chat extends Model {
    getUserInfoById(id) {
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
//# sourceMappingURL=ChatModel.js.map