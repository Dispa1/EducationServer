import express from 'express';
import { createOpenQuestionTest, deleteOpenQuestionTest, getAllOpenQuestionsTest, getOpenQuestionTestById } from '../controllers/OpenQuestionsController';
import authenticateToken from '../middleware/middleware';

const router = express.Router();

router.post('/createOpenQuestionTest', authenticateToken, createOpenQuestionTest);
router.delete('/deleteOpenQuestionTest', authenticateToken, deleteOpenQuestionTest);
router.get('/getAllOpenQuestionTest', authenticateToken, getAllOpenQuestionsTest);
router.get('/getOpenQuestionTestById/:questionId', authenticateToken, getOpenQuestionTestById);

export default router;
