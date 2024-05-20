import express from 'express';
import { createOpenQuestionTest, deleteOpenQuestionTest, getAllOpenQuestionsTest, getOpenQuestionTestById } from '../controllers/OpenQuestionsController';
import { createUserTestResult, getAllUserTestResults, getOpenQuestionstestResultById } from '../controllers/OpenQuestionstestResultController';
import authenticateToken from '../middleware/middleware';

const router = express.Router();

router.post('/createOpenQuestionTest', authenticateToken, createOpenQuestionTest);
router.delete('/deleteOpenQuestionTest/:questionId', authenticateToken, deleteOpenQuestionTest);
router.get('/getAllOpenQuestionTest', authenticateToken, getAllOpenQuestionsTest);
router.get('/getOpenQuestionTestById/:questionId', authenticateToken, getOpenQuestionTestById);
router.post('/createUserOpenTestResult/:testId', authenticateToken, createUserTestResult);
router.get('/getAllUserTestResults', authenticateToken, getAllUserTestResults);
router.get('/open-questionstest-results/:id', authenticateToken, getOpenQuestionstestResultById);

export default router;
