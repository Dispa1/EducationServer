import express from 'express';
import { createClosedQuestionTest, getAllClosedQuestionsTest, deleteClosedQuestionTest, getClosedQuestionTestById, checkAnswers } from '../controllers/ClosedQuestionController';
import authenticateToken from '../middleware/middleware';

const router = express.Router();

router.post('/createClosedQuestionTest', authenticateToken, createClosedQuestionTest);
router.get('/getAllClosedQuestionsTest', authenticateToken, getAllClosedQuestionsTest);
router.delete('/deleteClosedQuestionTest/:questionId', authenticateToken, deleteClosedQuestionTest);
router.get('/getClosedQuestionTestById/:questionId', authenticateToken, getClosedQuestionTestById);
router.post('/checkAnswers/:testId', authenticateToken, checkAnswers);

export default router;
