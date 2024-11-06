import initializer from "#core/utils/initializer.js";
import mainDatabase from "#core/service/baseDbService.js";
import helmet from "helmet";
import express from "express";
import path from "path";
import asyncFn from "#core/utils/asyncFn.js";
import jwtFn from "#core/utils/jwtFn.js";

import indexRouter from "#routes/index.js";
import sampleRouter from "#routes/samples/index.js";
import cors from "cors";

await initializer.initializeConfig();
await initializer.initializeConfigPost();

const port      = process.env.SERVICE_PORT || 5000;
const app       = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.disable('x-powered-by');

app.use(cors({
    origin: '*', 
    credential: true 
}));


app.use(express.urlencoded( {extended: false} ) );
app.use(express.json());
app.use( express.static("public"));

app.set('views', path.join(path.resolve(), 'views'));
app.set('view engine', 'ejs');

app.use ((req,res,next) => {
    console.log (`##    INTRO FILTER - 모든 패킷 통과 ::: [ CLIENT IP : ${req.ip} , REQUEST URL : ${req.url} ]`);
    next();
});

//  auth route 이전 검토 
app.post("/registUserInfo", asyncFn.asyncRouterWrapper( async (req, res, next) => {
    console.log ( req.body );
    const userInfo = req.body;
    // id, pwd 등으로 사용자 권한 검증 ..  

    // 정상적인 사용자일 경우 사용자 검증 Token 구성 .. 
    const result = await jwtFn.makeAuthorityHttpCookies(res, userInfo);
    const status = ( result === true ) ? 0 : -1;
    //const fResult = common.makeCommonJsonResult(result,status);
    const fResult = {'status':status, 'message':'정상적으로 진행되었습니다.', data:userInfo, subStatus:status};
    res.json(fResult);
}));


app.use ( async (req,res,next) => {
    console.time("CHECK_AUTHORIZATION_USERS");
    let secureInfos = await jwtFn.getAuthorityFromHttpCookies(req);
    if ( !secureInfos || secureInfos.status === -1 ) {
        const userID = "UNKNOWN_ID";
        /*
        const data = {
            "title": "USER-LOGIN",
            "message": "LOGIN PROCESS",
            'infos': {
                mainTitle : 'Login',
                userID : '',
                userRole : -1
            }
        };
        //res.render("index", data);
        res.render("./login", data);    
        */
        res.locals.user = {'userID': userID, 'userRole' : 1};
       next();
    } else {
        const userID = secureInfos.value.id;
        res.locals.user = {'userID': userID, 'userRole' : 1};
        next();
    }
    console.timeEnd("CHECK_AUTHORIZATION_USERS");
});

app.use("/", indexRouter);
app.use("/samples", sampleRouter);

/**
 * Default Page Not Found ...  
 */
app.use ((req,res,next) => {
    res.status = 404;
    console.log (`##    FILE NOT FOUND - REQUEST INFO ::: [ CLIENT IP : ${req.ip} , REQUEST URL : ${req.url} ]`);
    res.send("PAGE NOT FOUND!!!");
    res.end();
});

/**
 * Default Error Page Handling
 */
app.use ((err,req,res,next) => {
    res.status = 500;
    console.dir ( err );
    res.send("INTENAL SERVER ERROR!!!");
    res.end();
});


const closeResources = async () => {
    //await mainSchedule.graceShutdownSchedule();
    await mainDatabase.graceShutdownPool();
    server.close( () => {
        console.log(`HTTP Service closed .... [ PORT : ${port} ]`);
        process.exit(0);
    });
    server.closeAllConnections();
};

const server = app.listen(port, () => {
    console.log(`Express Server Serivce on : ${port} port ....`);
});

process.on('SIGINT', async () => {
    console.log("Closing Start ...........");
    await closeResources();
    console.log("Closing  ...........");
});

process.on('SIGTERM', async () => {
    console.log("SIG TERM Closing Start ...........");
    await closeResources();
    console.log("SIG TERM Closing  ...........");
});





