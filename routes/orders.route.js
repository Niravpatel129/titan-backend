const express = require('express');
const { fetchPendingOrders } = require('../controllers/orders.controller');
const router = express.Router();

router.get('/pending', fetchPendingOrders);

module.exports = router;
