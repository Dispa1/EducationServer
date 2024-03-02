import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import { Message } from '../models/MessageModel.js';
import { Chat } from '../models/ChatModel.js';
import { UserMessageStatus } from '../models/MessageStatusModel.js';
import { Op } from 'sequelize';
import sequelize from '../config/database.js';
config();
const getUsersInChat = async (chatId) => {
    try {
        const chat = await Chat.findByPk(chatId);
        if (!chat) {
            throw new Error('Chat not found');
        }
        const users = chat.users;
        return users;
    }
    catch (error) {
        console.error('Error getting users in chat:', error);
        throw error;
    }
};
export const createMessage = async (req, res) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { chatId, chatName, participantName, content, image, file } = req.body;
        const createdMessage = await Message.create({
            chatId,
            chatName,
            participantName,
            userId: decodedToken.uid,
            userName: decodedToken.sub,
            content,
            image,
            file,
        });
        const messageId = createdMessage.id;
        await UserMessageStatus.create({
            userId: decodedToken.uid,
            messageId,
            isRead: true,
        });
        const usersInChat = await getUsersInChat(chatId);
        await Promise.all(usersInChat.map(async (user) => {
            if (user.id !== decodedToken.uid) {
                await UserMessageStatus.create({
                    chatId,
                    userId: user.id,
                    messageId,
                    isRead: false,
                });
            }
        }));
        return res.status(201).json(createdMessage);
    }
    catch (error) {
        console.error('Error creating message:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const updateMessage = async (req, res) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const messageId = req.params.messageId;
        const { content } = req.body;
        const messageToUpdate = await Message.findByPk(messageId);
        if (!messageToUpdate) {
            return res.status(404).json({ error: 'Message not found' });
        }
        if (messageToUpdate.userId !== decodedToken.uid) {
            return res.status(403).json({ error: 'You do not have permission to update this message' });
        }
        if (content !== undefined) {
            messageToUpdate.content = content;
        }
        await messageToUpdate.save();
        return res.status(200).json(messageToUpdate);
    }
    catch (error) {
        console.error('Error updating message:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const deleteMessage = async (req, res) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const messageId = req.params.messageId;
        const messageToDelete = await Message.findByPk(messageId);
        if (!messageToDelete) {
            return res.status(404).json({ error: 'Message not found or you do not have permission to delete it' });
        }
        if (messageToDelete.userId !== decodedToken.userId) {
            return res.status(403).json({ error: 'You do not have permission to delete this message' });
        }
        await messageToDelete.destroy();
        return res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting message:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const getAllMessagesFromChat = async (req, res) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY);
        const chatId = req.params.chatId;
        const { page, pageSize } = req.query;
        const offset = (parseInt(page) - 1) * parseInt(pageSize);
        const limit = parseInt(pageSize);
        const chat = await Chat.findByPk(chatId);
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }
        const messages = await Message.findAll({
            where: { chatId },
            order: [['createdAt', 'DESC']],
            offset,
            limit,
        });
        const messageStatuses = await Promise.all(messages.map(async (message) => {
            const isMessageReadByAll = await Promise.all(chat.users.map(async (user) => {
                const status = await UserMessageStatus.findOne({ where: { userId: user.id, messageId: message.id } });
                return status ? status.isRead : false;
            }));
            const isMessageRead = isMessageReadByAll.every((isRead) => isRead);
            return { ...message.toJSON(), isRead: isMessageRead };
        }));
        return res.status(200).json(messageStatuses);
    }
    catch (error) {
        console.error('Error getting messages:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
const storage = multer.diskStorage({
    destination: '../utils/voiceMessage',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});
const upload = multer({ storage });
export const createVoiceMessage = async (req, res) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { chatId } = req.body;
        upload.single('voiceMessage')(req, res, async (err) => {
            var _a;
            if (err) {
                console.error('Error uploading voice message:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            const voiceMessagePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
            const newMessage = await Message.create({
                chatId,
                userId: decodedToken.userId,
                voiceMessage: voiceMessagePath,
            });
            return res.status(201).json(newMessage);
        });
    }
    catch (error) {
        console.error('Error creating voice message:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const getLastMessageInChat = async (req, res) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY);
        const chatId = req.params.chatId;
        const lastMessage = await Message.findOne({
            where: { chatId },
            order: [['createdAt', 'DESC']],
        });
        if (!lastMessage) {
            return res.status(200).json({ message: 'Сообщений еще нет' });
        }
        return res.status(200).json(lastMessage);
    }
    catch (error) {
        console.error('Error getting last message in chat:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const createMessageStatus = async (req, res) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { messageId } = req.body;
        if (!messageId) {
            return res.status(400).json({ error: 'MessageId is required' });
        }
        const messageStatus = await UserMessageStatus.create({
            userId: decodedToken.uid,
            messageId,
            isRead: true,
        });
        return res.status(201).json({ message: 'Message status created successfully', data: messageStatus });
    }
    catch (error) {
        console.error('Error creating message status:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
export const updateMessageStatus = async (req, res) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { messageId } = req.params;
        const message = await Message.findOne({ where: { id: messageId } });
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        const updatedStatus = await UserMessageStatus.update({ isRead: true }, { where: { userId: decodedToken.uid, messageId } });
        if (updatedStatus) {
            return res.status(200).json({ message: 'Message status updated successfully', data: updatedStatus });
        }
        else {
            return res.status(404).json({ error: 'Message status not found or you do not have permission to update it' });
        }
    }
    catch (error) {
        console.error('Error updating message status:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const countUnreadMessagesInChat = async (req, res) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const chatId = req.params.chatId;
        const unreadMessagesCount = await UserMessageStatus.count({
            where: {
                userId: decodedToken.uid,
                isRead: false,
                messageId: {
                    [Op.in]: sequelize.literal(`(SELECT id FROM "Messages" WHERE "chatId" = ${chatId})`)
                }
            }
        });
        return res.status(200).json({ count: unreadMessagesCount });
    }
    catch (error) {
        console.error('Error counting unread messages:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
//# sourceMappingURL=MessageController.js.map