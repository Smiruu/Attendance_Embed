import express from 'express';
import scheduleController from './scheduleController'
import { adminAuth } from '../../middleware/adminAuth';
import { authenticate } from '../../middleware/authenticate';

const router = express.Router()

router.use(adminAuth)
router.use(authenticate)

