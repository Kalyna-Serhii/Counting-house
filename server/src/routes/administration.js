const express = require('express');

const router = express.Router();

const administrationController = require('../controllers/administration');

router.post('/administration/user', administrationController.createFakeUser);
router.patch('/administration/user/:id', administrationController.updateFakeUser);

module.exports = router;
