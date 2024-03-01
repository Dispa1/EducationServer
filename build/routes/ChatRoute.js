import express from 'express';
import { createIndividualChat, createGroupChat, deleteChat, getUserChats } from '../controllers/ChatController.js';
const router = express.Router();
router.post('/individual-chat', createIndividualChat);
router.post('/group-chat', createGroupChat);
router.delete('/chats/:chatId', deleteChat);
router.get('/getUserChats', getUserChats);
export default router;
//# sourceMappingURL=ChatRoute.js.map