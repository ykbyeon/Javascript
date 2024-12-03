import express from "express";
import asyncify  from "express-asyncify";
const router    = asyncify(express.Router());
import path from "path";


router.get("/", async (req, res) => {
    const data = {
        "title": "제목 테스트 입니다.", 
        "message": "My World!!!",
        'infos': {
            mainTitle : 'Home',
            userID : res.locals.user.userID,
            userRole : res.locals.user.userRole
        }
    };
    //res.render("index", data);
    res.render("index", data);    
});

router.get("/about", async (req, res) => {
    const data = {
        "title": "제목 테스트 입니다.",
        "message": "My World!!!",
        'infos': {
            mainTitle : 'About',
            userID : res.locals.user.userID,
            userRole : res.locals.user.userRole
        }
    };
    //res.render("index", data);
    res.render("./about/about", data);    
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
    res.clearCookie(process.env.MAIN_COOKIE_KEY);
    res.clearCookie(process.env.REFRESH_COOKIE_KEY);
    res.redirect("/");
    res.end();
});


export default router;