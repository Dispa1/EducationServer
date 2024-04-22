import express from 'express';
import { createNews, deleteNews, getAllNews } from '../controllers/NewsController';
import authenticateToken from '../middleware/middleware';

const router = express.Router();

router.post('/news', authenticateToken, createNews);

router.delete('/deleteNews/:id', authenticateToken, deleteNews);

router.get('/getAllNews', authenticateToken, getAllNews);

export default router;
