"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMessageStatus = void 0;
const sequelize_1 = require("sequelize");
const database_js_1 = __importDefault(require("../config/database.js"));
const MessageModel_js_1 = require("./MessageModel.js");
class UserMessageStatus extends sequelize_1.Model {
}
exports.UserMessageStatus = UserMessageStatus;
UserMessageStatus.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    messageId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: MessageModel_js_1.Message,
            key: 'id',
        },
        allowNull: false,
    },
    isRead: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    modelName: 'UserMessageStatus',
});
exports.default = UserMessageStatus;
//# sourceMappingURL=MessageStatusModel.js.map