import express from 'express';
import { getStudents, getStudentWithId, createStudent, updateStudent, patchStudent, deleteStudent} from '../controllers/studentController.js';
import { authenticateToken, authenticateTokenAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();
// only admins can get all student data
router.get('/students', authenticateTokenAdmin, getStudents);
// any account needs to retrieve their info via id
router.get('/students/:studentId', authenticateToken, getStudentWithId);
router.post('/students', createStudent);
router.put('/students/:studentId', updateStudent);
router.patch('/students/:studentId', patchStudent);
router.delete('/students/:studentId', deleteStudent);


router.get('/studentsAuth/:studentId', authenticateToken, getStudentWithId);

export default router;