"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserChats = exports.deleteChat = exports.createGroupChat = exports.createIndividualChat = void 0;
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ChatModel_js_1 = require("../models/ChatModel.js");
const sequelize_1 = require("sequelize");
(0, dotenv_1.config)();
const createIndividualChat = async (req, res) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        const { memberId, memberUsername, memberFullname } = req.body;
        const creatorId = decodedToken.uid;
        const existingChat = await ChatModel_js_1.Chat.findOne({
            where: {
                isGroupChat: false,
                users: {
                    [sequelize_1.Op.contains]: [
                        { id: creatorId },
                        { id: memberId }
                    ]
                }
            },
        });
        if (existingChat) {
            return res.status(200).json(existingChat);
        }
        const newChat = await ChatModel_js_1.Chat.create({
            isGroupChat: false,
            name: memberUsername,
            users: [
                { id: creatorId, username: decodedToken.sub, fullname: decodedToken.name },
                { id: memberId, username: memberUsername, fullname: memberFullname }
            ],
            creatorId: [{ id: creatorId, username: decodedToken.sub, fullname: decodedToken.name }],
        });
        return res.status(201).json(newChat);
    }
    catch (error) {
        console.error('Error creating individual chat:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.createIndividualChat = createIndividualChat;
const createGroupChat = async (req, res) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        const { participantUserIds, chatName, participantUsernames, participantFullnames } = req.body;
        if (!participantUserIds || participantUserIds.length < 2) {
            return res.status(400).json({ error: 'Group chat must have at least two participants' });
        }
        const existingChat = await ChatModel_js_1.Chat.findOne({ where: { name: chatName } });
        if (existingChat) {
            return res.status(400).json({ error: 'A chat with this name already exists' });
        }
        const userIds = [...participantUserIds, decodedToken.uid];
        const usernames = [...participantUsernames, decodedToken.sub];
        const fullnames = [...participantFullnames, decodedToken.name];
        const newChat = await ChatModel_js_1.Chat.create({
            name: chatName,
            isGroupChat: true,
            users: userIds.map((id, index) => ({ id, username: usernames[index], fullname: fullnames[index] })),
            creatorId: [{ id: decodedToken.uid, username: decodedToken.sub, fullname: decodedToken.name }],
        });
        return res.status(201).json(newChat);
    }
    catch (error) {
        console.error('Error creating group chat:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.createGroupChat = createGroupChat;
const deleteChat = async (req, res) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        const chatId = req.params.chatId;
        const chatToDelete = await ChatModel_js_1.Chat.findOne({ where: { id: chatId, creatorId: { [sequelize_1.Op.contains]: [{ id: decodedToken.uid }] } } });
        if (!chatToDelete) {
            return res.status(404).json({ error: 'Chat not found or you do not have permission to delete it' });
        }
        await chatToDelete.destroy();
        return res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting chat:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.deleteChat = deleteChat;
const getUserChats = async (req, res) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        const userChats = await ChatModel_js_1.Chat.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { isGroupChat: true, users: { [sequelize_1.Op.contains]: [{ id: decodedToken.uid }] } },
                    { isGroupChat: false, users: { [sequelize_1.Op.contains]: [{ id: decodedToken.uid }] } }
                ]
            }
        });
        return res.status(200).json(userChats);
    }
    catch (error) {
        console.error('Error fetching user chats:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getUserChats = getUserChats;
//# sourceMappingURL=ChatController.js.map