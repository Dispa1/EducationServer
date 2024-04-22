import express from 'express';
import { createCourse, updateCourse, getAllCourses, deleteCourse, getCourseById } from '../controllers/CourseController';
import authenticateToken from '../middleware/middleware';

const router = express.Router();

router.post('/createCourse', authenticateToken, createCourse);
router.patch('/updateCourse', authenticateToken, updateCourse);
router.get('/getAllCourses', authenticateToken, getAllCourses);
router.delete('/deleteCourse', authenticateToken, deleteCourse);
router.get('/getCourseById/:courseId', authenticateToken, getCourseById);
export default router;
