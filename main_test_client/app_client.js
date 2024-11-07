import initializer from "#core/utils/initializer.js";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import path from "path";

await initializer.initializeConfigPost();

const port = process.env.SERVICE_PORT || 5000;
const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.disable('x-powered-by');
app.use(cors({
    origin: '*',
    credential: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.set('views', path.join(path.resolve(), 'views'))
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    console.log(`##    INTRO FILTER - 모든 패킷 통과 ::: [ CLIENT IP : ${req.ip} , REQUEST URL : ${req.url} ]`);
    next();
});


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