import express from 'express';
import userController from '../controllers/user';

const router = express.Router();

router.get('/users', userController.getUsers);
router.get('/user/:id', userController.getUserById);
router.patch('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

export default router;
