var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;

    if (pathname === '/') { //pathname 만으로는 home과 각각의 페이지를 구분할 수 없다.
        if (queryData.id === undefined) {   //home과 각각의 페이지를 구분할 수 있는 구분자
            fs.readdir('./data', (error, filelist) => {
                console.log(filelist);

                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list_type = 'ol';

                // var list = `<${list_type}>
                //     <li><a href="/?id=HTML">HTML</a></li>
                //     <li><a href="/?id=CSS">CSS</a></li>
                //     <li><a href="/?id=JavaScript">JavaScript</a></li>
                // </${list_type}>`

                var list = `<${list_type}>`;

                for (var i = 0; i < filelist.length; ++i) {
                    list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
                }
                list += `</${list_type}>`;

                var template = `<!doctype html>
                <html>
                <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
                </head>
                <body>
                <h1><a href="/">WEB</a></h1>
                ${list}
                <h2>${title}</h2>
                <p>${description}</p>
                </body>
                </html>
                `;
                response.writeHead(200);
                response.end(template);
            })
        } else {
            fs.readdir('./data', (error, filelist) => {
                console.log(filelist);

                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list_type = 'ol';

                // var list = `<${list_type}>
                //     <li><a href="/?id=HTML">HTML</a></li>
                //     <li><a href="/?id=CSS">CSS</a></li>
                //     <li><a href="/?id=JavaScript">JavaScript</a></li>
                // </${list_type}>`

                var list = `<${list_type}>`;

                for (var i = 0; i < filelist.length; ++i) {
                    list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
                }
                list += `</${list_type}>`;

                fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
                    var title = queryData.id;
                    var list_type = 'ol';
                    var template = `<!doctype html>
                <html>
                <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
                </head>
                <body>
                <h1><a href="/">WEB</a></h1>
                ${list}
                <h2>${title}</h2>
                <p>${description}</p>
                </body>
                </html>
                `;
                    response.writeHead(200);
                    response.end(template);
                })
            })
        }
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
    console.log(__dirname + _url);
});
app.listen(3000);