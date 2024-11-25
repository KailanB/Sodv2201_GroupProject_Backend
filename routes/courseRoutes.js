import express from 'express';
import { getCourses, getCoursesOfProgram, getCoursesOfUser, createCourse, updateCourse, deleteCourse } from '../controllers/courseController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/courses', getCourses);
router.get('/courses/:id', getCoursesOfUser);
router.get('/courses/program/:programId', getCoursesOfProgram);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);
// I added this now because I was having token issues with admin acc
router.post('/course', createCourse);

// We need to test more 
router.post('/create-course', authenticateToken, createCourse);

export default router;