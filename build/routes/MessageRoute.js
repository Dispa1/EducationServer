"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MessageController_js_1 = require("../controllers/MessageController.js");
const router = express_1.default.Router();
router.post('/createMessage', MessageController_js_1.createMessage);
router.put('/messages/:messageId', MessageController_js_1.updateMessage);
router.delete('/messages/:messageId', MessageController_js_1.deleteMessage);
router.get('/chats/:chatId/messages', MessageController_js_1.getAllMessagesFromChat);
router.get('/chats/:chatId/last-message', MessageController_js_1.getLastMessageInChat);
router.post('/chats/createMessageStatus', MessageController_js_1.createMessageStatus);
router.put('/messages/:messageId/status', MessageController_js_1.updateMessageStatus);
router.get('/chats/:chatId/unread-count', MessageController_js_1.countUnreadMessagesInChat);
exports.default = router;
//# sourceMappingURL=MessageRoute.js.map