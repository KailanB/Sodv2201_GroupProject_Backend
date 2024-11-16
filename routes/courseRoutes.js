import express from 'express';
import { getCourses, getCoursesOfProgram, getCoursesOfUser, createCourse, updateCourse, deleteCourse } from '../controllers/courseController.js';

const router = express.Router();

router.get('/courses', getCourses);
router.get('/courses/:id', getCoursesOfUser);
router.get('/courses/program/:programId', getCoursesOfProgram);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);

export default router;