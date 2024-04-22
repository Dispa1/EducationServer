"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const database_1 = __importDefault(require("./config/database"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const RoleRoute_1 = __importDefault(require("./routes/RoleRoute"));
const OpenQuestionsRoute_1 = __importDefault(require("./routes/OpenQuestionsRoute"));
const ClosedQuestionRoute_1 = __importDefault(require("./routes/ClosedQuestionRoute"));
const CourseRoute_1 = __importDefault(require("./routes/CourseRoute"));
const NewsRoute_1 = __importDefault(require("./routes/NewsRoute"));
const SwaggerRoute_1 = __importDefault(require("./routes/SwaggerRoute"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/api', UserRoute_1.default);
app.use('/api', RoleRoute_1.default);
app.use('/api', OpenQuestionsRoute_1.default);
app.use('/api', ClosedQuestionRoute_1.default);
app.use('/api', CourseRoute_1.default);
app.use('/api', NewsRoute_1.default);
app.use('/api-docs', SwaggerRoute_1.default);
database_1.default.sync().then(() => {
    server.listen(7890, () => {
        console.log("Сервер стартовал на порту 7890");
    });
});
//# sourceMappingURL=main.js.map