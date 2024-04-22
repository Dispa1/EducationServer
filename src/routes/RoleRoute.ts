import express from 'express';
import { createRole, getAllRoles, deleteRole } from '../controllers/RoleController';
import authenticateToken from '../middleware/middleware';

const router = express.Router();

router.post('/createRole', authenticateToken, createRole);
router.get('/getAllRoles', authenticateToken, getAllRoles);
router.delete('/deleteRole/:roleId', authenticateToken, deleteRole); 

export default router;
