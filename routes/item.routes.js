const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller.js');

router.post('/', itemController.createItem);

// Add other route handlers as needed.

module.exports = router;
