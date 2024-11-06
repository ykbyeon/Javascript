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

app.use(morgan(process.argv[2] || 'dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
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


// GET /ejs
app.get('/ejs', (req, res) => {
    res.render("getAll");
});


app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});



app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
