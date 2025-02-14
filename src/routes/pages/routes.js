const homeRouter = require('./homeRouter');
const express = require('express');

const router = express.Router();

router.use('', homeRouter);

module.exports = router;