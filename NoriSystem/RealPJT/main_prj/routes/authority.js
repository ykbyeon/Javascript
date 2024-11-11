import express from "express";
import asyncify  from "express-asyncify";
const router    = asyncify(express.Router());
import path from "path";
import authCtrl from "#controllers/authorityController.js";
import baseAuthCtrl from "#core/controller/baseAuthorityController.js";
import jwtFn from "#core/utils/jwtFn.js";
import common from "#core/utils/common.js";

router.get("/", async (req, res) => {
    res.clearCookie(process.env.MAIN_COOKIE_KEY);
    res.clearCookie(process.env.REFRESH_COOKIE_KEY);
    const data = {
        "title": "로그인",
        "message": "로그인",
        'infos': {
            mainTitle : 'Login',
            userID : '',
            userRole : -1
        }
    };
    //res.render("index", data);
    res.render("./login", data);    
});

router.get("/login", async (req, res) => {
    res.clearCookie(process.env.MAIN_COOKIE_KEY);
    res.clearCookie(process.env.REFRESH_COOKIE_KEY);
    const data = {
        "title": "로그인",
        "message": "로그인",
        'infos': {
            mainTitle : 'Login',
            userID : '',
            userRole : -1
        }
    };
    //res.render("index", data);
    res.render("./login", data);    
});

router.get("/logout", async (req, res) => {
    let secureInfos = await jwtFn.getAuthorityFromHttpCookies(req);
    if ( secureInfos && secureInfos.status === 0 ) {
        const userID = secureInfos.value.userID;
        await baseAuthCtrl.removeUserAuthoization({id:userID, userID: userID});
    }
    res.clearCookie(process.env.MAIN_COOKIE_KEY);
    res.clearCookie(process.env.REFRESH_COOKIE_KEY);
    res.redirect("/auth/login");
    res.end();
});

router.post( "/registUserInfoJWT", async (req, res) => {
    const params = req.body;
    console.log ( params );
    const userDto = await baseAuthCtrl.registUserAuthorization(params);
    //console.log ( userDto );
    const data = {
        userID : userDto.getUserID(),
        userRole : userDto.getUserRole()
    };
    const result = await jwtFn.makeAuthorityHttpCookies(res, data);
    console.dir( result, data );
    const status = ( result.status === true ) ? 0 : -1;
    const fResult = common.makeCommonJsonResult(result,status);    
    res.json(fResult);
});


export default router;
