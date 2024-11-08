// 2024.11.07 main_test프로그램의 app.js 파일내용을 기준으로, 필요한 항목들만 추려냄 - yk.byeon

import initializer from "#core/utils/initializer.js";
import express from "express";
import helmet from "helmet";
import path from "path";
import sampleRouter from "#routes/samples/index.js";
import sampleRouter2 from "#routes/samples/index2.js";

await initializer.initializeConfigPost();

const port = process.env.SERVICE_PORT || 5000;
const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.disable('x-powered-by');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.set('views', path.join(path.resolve(), 'views'))
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    console.log(`##    INTRO FILTER - 모든 패킷 통과 ::: [ CLIENT IP : ${req.ip} , REQUEST URL : ${req.url} ]`);
    next();
});



// 사용자 권한 부분에 대한 이해 및 구현 필요
app.use(async (req, res, next) => {
    console.time("CHECK_AUTHORIZATION_USERS");
    const userID = "UNKNOWN_ID";
    res.locals.user = { 'userID': userID, 'userRole': 1 };
    next();
    console.timeEnd("CHECK_AUTHORIZATION_USERS");
});



app.use("/samples", sampleRouter);
app.use("/samples2", sampleRouter2);


/**
 * Default Page Not Found ...  
 */
app.use((req, res, next) => {
    res.status = 404;
    console.log(`##    FILE NOT FOUND - REQUEST INFO ::: [ CLIENT IP : ${req.ip} , REQUEST URL : ${req.url} ]`);
    res.send("PAGE NOT FOUND!!!");
    res.end();
});



/**
 * Default Error Page Handling
 */
app.use((err, req, res, next) => {
    res.status = 500;
    console.dir(err);
    res.send("INTENAL SERVER ERROR!!!");
    res.end();
});



app.listen(port, () => {
    console.log(`Express Server Serivce on : ${port} port ....`);
});