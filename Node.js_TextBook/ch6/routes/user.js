const express = require('express');
const router = express.Router();

// GET /user 라우터
router.get('/', (req, res, next) => {
    res.send('Hello, User');
    next();
}, (req, res, next) => {
    console.log('user 라우터 입니다.')
});

module.exports = router;