const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
//app.set('port', process.env.PORT || 3000);
app.set('port', process.env.PORT || 8080);

//EJS Template engine설정
app.set("view engine", "ejs");
app.set("views", "./views");

app.use('/',express.static("./public"));

app.use(morgan(process.argv[2] || 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));

// [EJS강의 참고] 20강 EJS 엔진 사용법 | Do it! Node.js 프로그래밍 입문
// https://www.youtube.com/watch?v=HAO-QrgBvPA&list=PLG7te9eYUi7vxSvo6hvhOaht8oP0PoCwi&index=20

// [EJS강의 참고] 21강 전체 연락처 표시하기 | Do it! Node.js 프로그래밍 입문
// https://www.youtube.com/watch?v=dh_SAQqJu_c&list=PLG7te9eYUi7vxSvo6hvhOaht8oP0PoCwi&index=21

// [EJS강의 참고] 22강 연락처 추가하기 | Do it! Node.js 프로그래밍 입문
// https://www.youtube.com/watch?v=1KXqQFGm7g0&list=PLG7te9eYUi7vxSvo6hvhOaht8oP0PoCwi&index=22


// GET /ejs
app.get('/ejs', (req, res) => {
    const users = [
        { name: "Kim", email: "kim@abc.def", phone: "12345" },
        { name: "Lee", email: "lee@abc.def", phone: "56789" },
    ];

    res.render("getAll", { users: users });
});


app.get('/contacts', (req, res) => {
    const contacts = [
        { name: "Kim", email: "kim@abc.def", phone: "12345" },
        { name: "Lee", email: "lee@abc.def", phone: "56789" },
    ];

    res.render("index", { contacts: contacts });
});


app.get('/contacts/add', (req, res) => {
    res.render("add");
});

app.post('/contacts/add', (req, res) => {
    res.send("Create Contacts");
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});



app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
