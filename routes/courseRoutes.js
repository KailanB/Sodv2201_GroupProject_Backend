import express from 'express';
import { getCourses, getCoursesOfProgram, getCoursesOfUser, deleteCourseOfUser, addCourseOfUser, createCourse, updateCourse, deleteCourse } from '../controllers/courseController.js';
import { authenticateToken, authenticateTokenAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();
// all users can view all course data or by program
router.get('/courses', getCourses);
router.get('/courses/program/:programId', getCoursesOfProgram);

// get courses of a user
router.get('/courses/:id', authenticateToken, getCoursesOfUser);
router.delete('/courses/student/:studentId/:courseId', authenticateToken, deleteCourseOfUser)
router.post('/courses/student/:studentId/:courseId', authenticateToken, addCourseOfUser)

// only admins can create, update, delete
router.put('/courses/:id', authenticateTokenAdmin, updateCourse);
router.delete('/courses/:id', authenticateTokenAdmin, deleteCourse);
router.post('/course', authenticateTokenAdmin, createCourse);

// We need to test more 
router.post('/create-course', authenticateTokenAdmin, createCourse);




export default router;


//router.get('/courses/:id', authenticateToken, getCoursesOfUser);