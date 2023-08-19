import express from 'express';
import authController from '../controllers/auth-controller';

const router = express.Router();

router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/refresh', authController.refresh);

export default router;
