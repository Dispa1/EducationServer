import express from 'express';
import { createClosedQuestionTest, getAllClosedQuestionsTest, deleteClosedQuestionTest, getClosedQuestionTestById } from '../controllers/ClosedQuestionController';
import authenticateToken from '../middleware/middleware';

const router = express.Router();

router.post('/createClosedQuestionTest', authenticateToken, createClosedQuestionTest);
router.get('/getAllClosedQuestionsTest', authenticateToken, getAllClosedQuestionsTest);
router.delete('/deleteClosedQuestionTest', authenticateToken, deleteClosedQuestionTest);
router.get('/getClosedQuestionTestById/:questionId', authenticateToken, getClosedQuestionTestById);

export default router;
