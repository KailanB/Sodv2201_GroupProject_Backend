import express from 'express';
import { getStudents, getStudentWithId, createStudent, updateStudent, patchStudent, deleteStudent, getStudentByIdCookie} from '../controllers/studentController.js';
import { authenticateToken, authenticateTokenAdmin } from '../middleware/authMiddleware.js';

// ***** TEST
// import getStudentByIdCookie from '../controllers/studentController.js';

const router = express.Router();
// only admins can get all student data
router.get('/students', authenticateTokenAdmin, getStudents);
// any account needs to retrieve their info via id
// this is the new method to request student info byId via cookie
router.get('/students/byId', authenticateToken, getStudentByIdCookie);

router.post('/students', createStudent);
router.put('/students/:studentId', authenticateToken, updateStudent);
router.patch('/students/:studentId', authenticateToken, patchStudent);
router.delete('/students/:studentId', deleteStudent);


router.get('/studentsAuth/:studentId', authenticateToken, getStudentWithId);




// I am removing this method as cookie parsing is going to be handled in the backend so we cannot pass parameters here
//router.get('/students/:studentId', authenticateToken, getStudentWithId);

export default router;