const express = require('express');
const { fetchPendingOrders, fetchPrintedOrders } = require('../controllers/orders.controller');
const router = express.Router();

router.get('/pending', fetchPendingOrders);
router.get('/printed', fetchPrintedOrders);

module.exports = router;
