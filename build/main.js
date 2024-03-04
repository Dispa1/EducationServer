"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const database_js_1 = __importDefault(require("./config/database.js"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const MessageRoute_js_1 = __importDefault(require("./routes/MessageRoute.js"));
const ChatRoute_js_1 = __importDefault(require("./routes/ChatRoute.js"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)());
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});
app.use(body_parser_1.default.json());
app.use('/api', MessageRoute_js_1.default);
app.use('/api', ChatRoute_js_1.default);
io.on('connection', (socket) => {
    const customSocket = socket;
    console.log(`Пользователь в сети: ${customSocket.id}`);
    customSocket.on('authenticate', (userId) => {
        customSocket.userId = userId;
        console.log(`Пользователь ${userId} аутентифицирован с сокетом ${customSocket.id}`);
        customSocket.emit('authenticated');
    });
    customSocket.on('joinChatRoom', (chatId) => {
        if (!customSocket.userId) {
            console.log(`Ошибка: пользователь не аутентифицирован, поэтому не может присоединиться к комнате чата ${chatId}`);
            return;
        }
        customSocket.join(chatId.toString());
        console.log(`Пользователь ${customSocket.userId} присоединился к комнате чата ${chatId}`);
        customSocket.joinedChatRoom = true;
    });
    customSocket.on('sendMessage', async (data) => {
        if (!customSocket.joinedChatRoom) {
            console.log(`Ошибка: пользователь ${customSocket.userId} не присоединился к комнате чата, поэтому не может отправить сообщение`);
            return;
        }
        const { chatId, chatName, participantName, message, userId, userName, messageId, } = data;
        io.to(chatId.toString()).emit('message', {
            chatId: chatId,
            chatName: chatName,
            participantName: participantName,
            content: message,
            userId: userId,
            userName: userName,
            messageId,
            createdAt: new Date().toISOString(),
            isRead: false,
        });
        const lastMessage = {
            chatId: chatId,
            chatName: chatName,
            participantName: participantName,
            content: message,
            userId: userId,
            createdAt: new Date().toISOString(),
        };
        io.to(chatId.toString()).emit('updateLastMessage', lastMessage);
    });
    customSocket.on('updateMessage', (updatedMessage) => {
        const { chatId, message } = updatedMessage;
        io.to(chatId.toString()).emit('messageUpdated', message);
    });
    customSocket.on('updateMessageStatus', (updatedMessageStatus) => {
        const { chatId, messageStatus } = updatedMessageStatus;
        io.to(chatId.toString()).emit('messageStatusUpdated', messageStatus);
    });
    customSocket.on('leaveRoom', (chatId) => {
        customSocket.leave(chatId.toString());
        console.log(`Пользователь ${customSocket.userId} покинул комнату чата ${chatId}`);
        customSocket.joinedChatRoom = false;
    });
});
io.on('disconnect', () => {
    console.log('Клиент отключился от WebSocket');
});
database_js_1.default.sync().then(() => {
    server.listen(8888, () => {
        console.log("Сервер стартовал на порту 8888");
    });
});
//# sourceMappingURL=main.js.map