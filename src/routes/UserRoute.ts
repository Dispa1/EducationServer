import express from 'express';
import { registerUser, loginUser, getAllUsers, updateUser, refreshToken } from '../controllers/UserController';
import authenticateToken from '../middleware/middleware';

const router = express.Router();

router.post('/register', authenticateToken, registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);
router.get('/getAll', authenticateToken, getAllUsers);
router.patch('/updateUser/:userID', authenticateToken, updateUser);

export default router;
