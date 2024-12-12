import express from 'express';
import { getAllTerms, getAllPrograms, getAllDepartments } from '../controllers/dataController.js';


const router = express.Router();




// routes for input and drop down menu data 
router.get('/data/getTerms', getAllTerms);
router.get('/data/getPrograms', getAllPrograms);
router.get('/data/getDepartments', getAllDepartments);

export default router;