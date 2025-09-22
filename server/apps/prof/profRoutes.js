import express from 'express';
import profController from './profController.js';
import { adminAuth } from '../../middleware/adminAuth.js';
import {authenticate} from '../../middleware/authenticate.js';

const router = express.Router();

router.use(authenticate);


router.post('/create', adminAuth, profController.createProf);
router.delete('/:profId', adminAuth, profController.deleteProf);
router.get('/', adminAuth, profController.getProfList);
router.post('/courses/create', adminAuth,profController.createCourse);
router.get('/courses/:profId', profController.getProfCourses);


export default router;