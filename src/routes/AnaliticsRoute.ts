import express, { Router } from 'express';
import { createAnalytics, getAllAnalytics, getAllAnalyticsForUser } from '../controllers/AnaliticsController';
import authenticateToken from '../middleware/middleware';

const router: Router = express.Router();

router.post('/analytics', authenticateToken, createAnalytics);
router.get('/AllAnalytics', authenticateToken, getAllAnalytics);
router.get('/AllAnalytics/:userId', authenticateToken, getAllAnalyticsForUser);

export default router;
