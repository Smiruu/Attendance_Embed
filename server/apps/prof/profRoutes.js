import express from 'express';
import profController from './profController.js';
import { adminAuth } from '../../middleware/adminAuth.js';
import {authenticate} from '../../middleware/authenticate.js';

const router = express.Router();

router.use(authenticate);
router.use(adminAuth)

router.post('/create', profController.createProf);
router.delete('/delete', profController.deleteProf);
router.post('/course/create', profController.createCourse);


export default router;