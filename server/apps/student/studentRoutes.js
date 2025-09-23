import express from 'express';
import studentController from './studentController.js';
import { authenticate } from '../../middleware/authenticate.js';
import { adminAuth } from '../../middleware/adminAuth.js';

const router = express.Router();

router.use(authenticate)
    router.use(adminAuth)

router.post('/create', studentController.createStudent)
router.get('/', studentController.getStudents)
router.delete('/:studentId', studentController.deleteStudent)

router.post('/course', studentController.addStudentsToCourse)

export default router