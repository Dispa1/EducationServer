import express from 'express';
import http from 'http';
import sequelize from './config/database.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Server } from 'socket.io';
import messageRoute from './routes/MessageRoute.js';
import chatRoute from './routes/ChatRoute.js';
const app = express();
const server = http.createServer(app);
app.use(cors());
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});
app.use(bodyParser.json());
app.use('/api', messageRoute);
app.use('/api', chatRoute);
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
        const { chatId, chatName, participantName, message, userId, messageId, } = data;
        io.to(chatId.toString()).emit('message', {
            chatId: chatId,
            chatName: chatName,
            participantName: participantName,
            content: message,
            userId: userId,
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
sequelize.sync().then(() => {
    server.listen(8888, () => {
        console.log("Сервер стартовал на порту 8888");
    });
});
//# sourceMappingURL=main.js.map