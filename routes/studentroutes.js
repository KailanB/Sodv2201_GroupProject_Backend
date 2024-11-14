import express from 'express';
import { getStudents, getStudentWithId, createStudent, updateStudent, patchStudent, deleteStudent} from '../controllers/studentController.js';

const router = express.Router();

router.get('/students', getStudents);
router.get('/students/:studentId', getStudentWithId);
router.post('/students', createStudent);
router.put('/students/:studentId', updateStudent);
router.patch('/students/:studentId', patchStudent);
router.delete('/students/:studentId', deleteStudent);

export default router;