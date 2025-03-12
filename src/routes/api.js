const express = require('express');

const router = express.Router();
router.use('/user', require('./api/userRouter'));
router.use('/post', require('./api/postRouter'));

module.exports = router;