"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ChatController_js_1 = require("../controllers/ChatController.js");
const router = express_1.default.Router();
router.post('/individual-chat', ChatController_js_1.createIndividualChat);
router.post('/group-chat', ChatController_js_1.createGroupChat);
router.delete('/chats/:chatId', ChatController_js_1.deleteChat);
router.get('/getUserChats', ChatController_js_1.getUserChats);
exports.default = router;
//# sourceMappingURL=ChatRoute.js.map