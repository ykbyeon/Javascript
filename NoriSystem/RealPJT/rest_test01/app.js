const express = require("express");
const Client = require("node-rest-client").Client;

const restClient = new Client();

const app = express();

let headerTokens = '';



app.use((req,res,next) => {
    //console.log ( req );
    console.log ( req.get('baseUrl') , req.get('origin') , req.get('host'));
    next();
});

app.use( express.static("public"));

app.get("/login", (req,res,next) => {
    const url = "http://192.168.2.39:3000/auth/registUserInfoJWT";

    const id = req.params.id;
    const password = req.params.pwd;

    const data = { id, password };

    const args = {
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    };

    const restReq = restClient.post(url, args, ( data, response) => {
        //console.log(response);
        console.log( response.headers.task_auth_tokens );
        if ( response.headers.task_auth_tokens ) {
            headerTokens = response.headers.task_auth_tokens;
        }
        res.json(data);
    });
    console.log ( restReq.options  );
    res.status(500);
});



app.get("/task_list", (req,res,next) => {
    const url = "http://192.168.2.39:3000/samples/list";
    let resObj = undefined;
    console.log ( `HEADER TOKENS : ${headerTokens}` );
    const args = {
        headers: {
            "Content-Type": "application/json; charset=utf-8", 
            "exec_authorization": headerTokens
        }
    };

    const restReq = restClient.post(url, args, ( data, response) => {
        //console.log(response);
        console.log( response.headers.task_auth_tokens );
        if ( response.headers.task_auth_tokens ) {
            headerTokens = response.headers.task_auth_tokens;
        }
        res.json(data);
    });
    console.log (`Options : ${restReq.options}`  );
});

app.listen( 3002, () => {
    console.log("3002 포트에서 대기 ....");
});