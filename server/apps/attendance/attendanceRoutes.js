import express from 'express'
import attendanceController from './attendanceController.js';
import {authenticate} from '../../middleware/authenticate.js';

const router = express.Router();

router.use(authenticate);

router.get('/:courseId/:date', attendanceController.getAttendanceOfSubject)

export default router;