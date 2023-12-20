const express = require('express');
const router = express.Router();

router.get('/print', printOrder);

module.exports = router;
