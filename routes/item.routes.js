const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller.js');

router.post('/', itemController.createItem);

module.exports = router;
