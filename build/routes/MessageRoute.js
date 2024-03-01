import express from 'express';
import { createMessage, updateMessage, deleteMessage, getAllMessagesFromChat, getLastMessageInChat, createMessageStatus, updateMessageStatus, countUnreadMessagesInChat, } from '../controllers/MessageController.js';
const router = express.Router();
router.post('/createMessage', createMessage);
router.put('/messages/:messageId', updateMessage);
router.delete('/messages/:messageId', deleteMessage);
router.get('/chats/:chatId/messages', getAllMessagesFromChat);
router.get('/chats/:chatId/last-message', getLastMessageInChat);
router.post('/chats/createMessageStatus', createMessageStatus);
router.put('/messages/:messageId/status', updateMessageStatus);
router.get('/chats/:chatId/unread-count', countUnreadMessagesInChat);
export default router;
//# sourceMappingURL=MessageRoute.js.map