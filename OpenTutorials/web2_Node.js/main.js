var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    // console.log("=============");
    // console.log(_url);
    // console.log("-----");
    // console.log(queryData);
    // console.log("-----");
    // console.log(queryData.id);
    // console.log(queryData.name);
    // console.log("=============");
    if (_url == '/') {
        //_url = '/index.html';
        title = 'Welcome';
    }
    if (_url == '/favicon.ico') {
        //return response.writeHead(404);
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);
    fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
        var list_type = 'ul';
        console.log(`description: ${description}`);
        var template = `<!doctype html>
        <html>
        <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
        </head>
        <body>
        <h1><a href="/">WEB</a></h1>
        <${list_type}>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
        </${list_type}>
        <h2>${title}</h2>
        <p>${description}</p>
        </body>
        </html>
        `;
        response.end(template);
    })
    console.log(__dirname + _url);
    //response.end(fs.readFileSync(__dirname + _url));



});
app.listen(3000);