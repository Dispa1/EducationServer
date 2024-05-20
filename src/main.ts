import express from 'express';
import http from 'http';
import sequelize from './config/database';
import bodyParser from 'body-parser';
import cors from 'cors';
import UserRoute from './routes/UserRoute';
import RoleRoute from './routes/RoleRoute';
import OpenQuestionsRoute from './routes/OpenQuestionsRoute';
import ClosedQuestionRoute from './routes/ClosedQuestionRoute';
import CourseRoute from './routes/CourseRoute';
import NewsRoute from './routes/NewsRoute';
import AnaliticsRoute from './routes/AnaliticsRoute';
import SwaggerRoute from './routes/SwaggerRoute';
import path from 'path';

const app = express();
const server = http.createServer(app);

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use(cors());
app.use(bodyParser.json());
app.use('/api', UserRoute);
app.use('/api', RoleRoute);
app.use('/api', OpenQuestionsRoute);
app.use('/api', ClosedQuestionRoute);
app.use('/api', CourseRoute);
app.use('/api', NewsRoute);
app.use('/api', AnaliticsRoute);
app.use('/api-docs', SwaggerRoute);

sequelize.sync().then(() => {
  server.listen(7890, () => {
    console.log("Сервер стартовал на порту 7890");
  });
});
