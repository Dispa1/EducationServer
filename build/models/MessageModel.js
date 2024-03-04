"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const sequelize_1 = require("sequelize");
const database_js_1 = __importDefault(require("../config/database.js"));
const ChatModel_js_1 = require("./ChatModel.js");
class Message extends sequelize_1.Model {
}
exports.Message = Message;
Message.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    chatId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: ChatModel_js_1.Chat,
            key: 'id',
        },
        allowNull: false,
    },
    chatName: {
        type: sequelize_1.DataTypes.STRING,
        references: {
            model: ChatModel_js_1.Chat,
            key: 'name',
        },
        allowNull: true,
    },
    participantName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    userId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    file: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    voiceMessage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    sequelize: database_js_1.default,
    modelName: 'Message',
});
exports.default = Message;
//# sourceMappingURL=MessageModel.js.map