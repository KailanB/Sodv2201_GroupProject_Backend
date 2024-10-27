import express from 'express';
import { getUsers, getUserWithId, createUser, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:userId', getUserWithId);
router.post('/users', createUser);
router.put('users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;