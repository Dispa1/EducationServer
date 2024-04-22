import express, { Router } from 'express';
import { createAnalytics } from '../controllers/AnaliticsController';

const router: Router = express.Router();

router.post('/analytics', createAnalytics);

export default router;
