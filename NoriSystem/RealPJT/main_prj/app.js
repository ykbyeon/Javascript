import initializer from "#core/utils/initializer.js";
import mainController from "#core/controller/baseAuthorityController.js";
import mainDatabase from "#core/service/baseDbService.js";
import helmet from "helmet";
import express from "express";
import path from "path";
import asyncFn from "#core/utils/asyncFn.js";
import jwtFn from "#core/utils/jwtFn.js";
import cors from "cors";

import authRouter from "#routes/authority.js"
import indexRouter from "#routes/index.js";
import sampleRouter from "#routes/samples/index.js";
import taskRouter from "#routes/tasks/index.js";
import common from "#core/utils/common.js";

await initializer.initializeConfig();
await initializer.initializeConfigPost();

const port      = process.env.SERVICE_PORT || 5000;
const app       = express();


app.use(cors({
    origin: '*', 
    credential: true 
}));

app.use(helmet({ contentSecurityPolicy: false }));
app.disable('x-powered-by');

app.set('views', path.join(path.resolve(), 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use( express.static("public"));

app.use ((req,res,next) => {
    console.log (`##    INTRO FILTER - 모든 패킷 통과 ::: [ CLIENT IP : ${req.ip} , REQUEST URL : ${req.url} , REQUEST ORIGIN : ${req.get('origin')}  ]`);
    const originStr = req.get('origin');
    const hostStr = req.get('host');

    if ( hostStr && originStr ) {
        const regex = new RegExp(hostStr);
        const flag = regex.test(originStr);
        console.log("!!!!!!!!!!!!!!!!!!!!");
        console.log ( regex,  flag );
        console.log("!!!!!!!!!!!!!!!!!!!!");
    }
    //console.log ( req.protocol, originStr, hostStr );

    next();
});

app.use("/auth", authRouter);

/*
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
*/


app.use ( asyncFn.asyncRouterWrapper( async (req,res,next) => {
    console.time("CHECK_AUTHORIZATION_USERS");
    let secureInfos = await jwtFn.getAuthorityFromHttpCookies(req);
//    console.log (`SECURE INFOS : ${JSON.stringify(secureInfos)}`);
    if ( !secureInfos || secureInfos.status === -1 ) {
        const originStr = req.get('origin');
        const hostStr = req.get('host');

        if ( hostStr && originStr ) {
            const regex = new RegExp(hostStr);
            const flag = regex.test(originStr);
            if ( !flag ) {
                res.json(common.makeCommonJsonResult("Please! Login", -1, "사용자 정보를 확인할 수 없습니다."));
                res.end();
            } else {
                res.redirect("/auth/login");
                res.end();
            }
        } else {
            //console.log ( originStr, hostStr );
            res.redirect("/auth/login");
            res.end();
        }
    } else {
        const userID = secureInfos.value.userID;
        const userDto = await mainController.checkUserAuthorization(userID);    
        const spendMillis = userDto.getDiffMillis();
//      console.log ( spendMillis ,  (30*60*1000), spendMillis/(60*1000)  );
        if ( spendMillis > (30*60*1000) ) {
            userDto.resetConnectionTimes();
            const data = {
                'userID' : userID, 
                'userRole' : userDto.getUserRole()
            };
            //  remake jwt cookies .. 
            await jwtFn.makeAuthorityHttpCookies(res, data);
            console.log( res );
        }
        res.locals.user = {'userID': userID, 'userRole' : 1};
        next();
    }
    console.timeEnd("CHECK_AUTHORIZATION_USERS");
}));

app.use("/", indexRouter);
app.use("/samples", sampleRouter);
app.use("/tasks", taskRouter);

/**
 * Default Page Not Found ...  
 */
app.use ((req,res,next) => {
    res.status = 404;
    res.send("PAGE NOT FOUND!!!");
    res.end();
});

/**
 * Default Error Page Handling
 */
app.use ((err,req,res,next) => {
    res.status = 500;
    console.log ( err );
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





