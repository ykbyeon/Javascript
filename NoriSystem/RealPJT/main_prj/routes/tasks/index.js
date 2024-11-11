import express from "express";
import asyncify  from "express-asyncify";
import mainController from '#core/controller/mainTaskController.js';

const router    = asyncify(express.Router());


router.post("/simple", async (req, res) => {
    const params = req.body;
    let reqOriginUrl = req.get('origin');
    if ( !reqOriginUrl ) {
        reqOriginUrl = '';
    }
    console.log (`TASK SIMPLE ::::: ${reqOriginUrl}`);
    params['reqOriginUrl'] = reqOriginUrl;
    const result = await mainController.requestSimpleCommands(params);
    res.json(result);
});

router.post("/requestJobOne", async(req, res) => {
    const result = await mainController.requestJobTaskCurrentStatusResultValues(req.body);
    res.json( result );
});

export default router;
