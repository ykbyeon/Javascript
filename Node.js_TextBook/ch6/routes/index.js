const express = require('express');
const router = express.Router();

const path = require('path');

// GET / 라우터
router.get('/', (req, res, next) => {
    console.log('다음 router로 이동합니다.')
    next('route');
}, (req, res, next) => {
    console.log('실행되지 않습니다');
    next();
}, (req, res, next) => {
    console.log('실행되지 않습니다');
    next();
});

router.get('/', (req, res, next) => {
    console.log('실행됩니다.')
    res.send('Hello Express');
    next();
}, (req, res, next) => {
    console.log('index 라우터 입니다.')
});


router.route('/abc')
    .get((req, res) => {
        //res.send('GET /abc');
        res.sendFile(path.join(__dirname, '..', 'multipart4.html'))
    })
    .post((req, res) => {
        res.send('POST /abc');
    });

module.exports = router;

