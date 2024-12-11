import express from 'express';
import { getAdminByIdCookie, sendMessage, getMessages } from '../controllers/adminController.js';
import { authenticateToken, authenticateTokenAdmin } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/admin/byId', authenticateTokenAdmin, getAdminByIdCookie);
router.get('/admin/messages', getMessages);
router.post('/admin/messages', sendMessage);

export default router;