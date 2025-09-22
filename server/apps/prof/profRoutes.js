import express from 'express';
import profController from './profController.js';
import { adminAuth } from '../../middleware/adminAuth.js';
import {authenticate} from '../../middleware/authenticate.js';

const router = express.Router();

router.use(authenticate);
router.use(adminAuth)

router.post('/create', profController.createProf);
router.delete('/:profId', profController.deleteProf);
router.get('/', profController.getProfList);
router.post('/courses/create', profController.createCourse);
router.get('/courses/:profId', profController.getProfCourses);


export default router;