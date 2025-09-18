import express from 'express';
import AuthenticationController from './authenticationController';

const router = express.Router();

router.post('/login', AuthenticationController.login);
router.post('/logout', AuthenticationController.logout);
router.get('/refresh-session', AuthenticationController.refreshSession);
