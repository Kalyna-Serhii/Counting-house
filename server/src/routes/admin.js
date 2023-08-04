const express = require('express');

const router = express.Router();
const adminController = require('../controllers/admin');

router.post('/admin/user', adminController.createFakeUser);
router.patch('/admin/user/:id', adminController.updateFakeUser);

module.exports = router;
