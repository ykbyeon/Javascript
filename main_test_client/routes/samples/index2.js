

import express from "express";
import asyncify from "express-asyncify";
const router = asyncify(express.Router());
import path from "path";
import sampleCtrl from "#controllers/sampleController.js";


router.get("/", async (req, res) => {
    const data = {
        "title": "제목 테스트 입니다.",
        "message": "My World!!!",
        'infos': {
            mainTitle: 'Sample',
            userID: res.locals.user.userID,
            userRole: res.locals.user.userRole
        },

        'data': {},
    };
    res.render("samples/sample2", data );
});

router.post("/list", async (req, res) => {
    let params = req.body;
    let result = await sampleCtrl.getSampleDataListAll(params);
    res.json(result);
});

router.get("/list", async (req, res) => {
    let params = req.params;
    console.log(params);
    let result = await sampleCtrl.getSampleDataListAll({ ID: '1', TITLE: 'T' });
    res.json(result);
});

router.post("/regist", async (req, res) => {
    let params = req.body;
    console.log(params);
    let result = await sampleCtrl.modifySampleMasterDetailValues(params);
    res.json(result);
});


export default router;
