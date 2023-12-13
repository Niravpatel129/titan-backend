const express = require('express');
const router = express.Router();
const readyOrdersController = require('../controllers/readyOrders.controller.js');

router.post('/addOrderToPrinted', readyOrdersController.addOrderToPrinted);

module.exports = router;
