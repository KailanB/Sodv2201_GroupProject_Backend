import express from 'express';
import { getAdminByIdCookie } from '../controllers/adminController.js';
import { authenticateToken, authenticateTokenAdmin } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/admin/byId', authenticateTokenAdmin, getAdminByIdCookie);

export default router;