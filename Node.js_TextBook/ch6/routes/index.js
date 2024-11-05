const express = require('express');
const router = express.Router();

// GET / 라우터
router.get('/', (req, res, next) => {
    res.send('Hello Express');
    next();
}, (req, res, next) => {
    console.log('index 라우터 입니다.')
});

module.exports = router;

