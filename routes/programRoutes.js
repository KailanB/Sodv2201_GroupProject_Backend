

import express from 'express';
import { getPrograms, getProgramWithId } from '../controllers/programController.js';

const router = express.Router();

router.get('/programs', getPrograms);
router.get('/programs/:id', getProgramWithId);


export default router;