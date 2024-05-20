import express from 'express';
import multer from 'multer';
import { createCourse, updateCourse, getAllCourses, deleteCourse, getCourseById } from '../controllers/CourseController';
import authenticateToken from '../middleware/middleware';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post('/createCourse', upload.single('image'), authenticateToken, createCourse);
router.patch('/updateCourse', authenticateToken, updateCourse);
router.get('/getAllCourses', authenticateToken, getAllCourses);
router.delete('/deleteCourse/:courseId', authenticateToken, deleteCourse);
router.get('/getCourseById/:courseId', authenticateToken, getCourseById);
export default router;
