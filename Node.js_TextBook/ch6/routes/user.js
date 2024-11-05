const express = require('express');
const router = express.Router();

// GET /user 라우터
router.get('/', (req, res, next) => {
    res.send('Hello, User');
    next();
}, (req, res, next) => {
    console.log('user 라우터 입니다.')
});


//http://localhost:8080/user/test/like22?name=yk.byeon&age=47&address=seoul
router.get('/test/:id', (req, res) => {
    console.log(req.params, req.query, req.body);
    res.send({ "param": req.params, "query": req.query, 'body': req.body });
    console.log('여기만 실행됩니다.');
});

router.get('/test/like', (req, res) => {
    console.log('여기는 실행되지 않습니다.');
});




module.exports = router;