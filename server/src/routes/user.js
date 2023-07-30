const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');

router.get('/users', userController.getUsers);
router.post('/user', userController.createUser);
router.get('/user/:id', userController.getUserById);
router.patch('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

module.exports = router;
