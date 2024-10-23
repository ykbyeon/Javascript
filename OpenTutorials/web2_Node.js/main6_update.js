var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

const templateHTML = (title, list, body, control) => {

    return `<!doctype html>
                <html>
                <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1><a href="/">WEB</a></h1>
                    ${list}
                    ${control}
                    ${body}
                </body>
                </html>
                `;
}

const templatelist = (list_type, filelist) => {
    var list = `<${list_type}>`;
    for (var i = 0; i < filelist.length; ++i) {
        list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    }
    list += `</${list_type}>`;

    return list;
}

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    console.log(pathname);
    var title = queryData.id;

    if (pathname === '/') { //pathname 만으로는 home과 각각의 페이지를 구분할 수 없다.
        if (queryData.id === undefined) {   //home과 각각의 페이지를 구분할 수 있는 구분자
            fs.readdir('./data', (error, filelist) => {
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list_type = 'ol';
                var list = templatelist(list_type, filelist);
                var body = `<h2>${title}</h2><p>${description}</p>`;
                var control = `<a href="/create">create</a>`;
                var template = templateHTML(title, list, body, control);
                response.writeHead(200);
                response.end(template);
            });
        } else {
            fs.readdir('./data', (error, filelist) => {
                var list_type = 'ol';
                var list = templatelist(list_type, filelist);
                fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
                    var title = queryData.id;
                    var body = `<h2>${title}</h2><p>${description}</p>`;
                    var control = `<a href="/create">create</a>
                                   <a href="/update?id=${title}">update</a>
                                   <form action="/delete_process" method="post">
                                        <input type = "hidden" name="id" value="${title}">
                                        <input type = "submit" value="delete">
                                   </form> `;
                    // !!!! 주의 !!!!!F
                    // delete는 Link방식으로 구현하면 절대안됨.
                    // Link는 노출되기 때문에, Link만 알아서 호출하면
                    // 데이터 삭제가 발생할 수도 있기 때문
                    // 이번 강의에서 delete는 form으로 구현함
                    var template = templateHTML(title, list, body, control);

                    response.writeHead(200);
                    response.end(template);
                });
            });
        }
    } else if (pathname === '/create') {
        fs.readdir('./data', (error, filelist) => {
            var title = 'WEB - create';
            var list_type = 'ol';
            var list = templatelist(list_type, filelist);
            var body = `<form action="/create_process" method="post">
                        <p><input type="text" name="title" placeholder="title"></p>
                        <p><textarea name="description"  placeholder="description"></textarea></p>
                        <p><input type="submit" value="Submit"></p>
                        </form>
                        `;
            var control = ``;
            var template = templateHTML(title, list, body, control);
            response.writeHead(200);
            response.end(template);
        });
    } else if (pathname === '/create_process') {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', () => {
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
                response.writeHead(302, { location: `/?id=${title}` });
                response.end();
            });
        });
    } else if (pathname === '/update') {
        fs.readdir('./data', (error, filelist) => {
            var list_type = 'ol';
            var list = templatelist(list_type, filelist);
            fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
                var title = queryData.id;
                var body = `<form action="/update_process" method="post">
                        <input type="hidden" name="id" value=${title}>
                        <p><input type="text" name="title" placeholder="title" value=${title}></p>
                        <p><textarea name="description"  placeholder="description">${description}</textarea></p>
                        <p><input type="submit" value="Submit"></p>
                        </form>
                        `;
                var control = `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`;
                var template = templateHTML(title, list, body, control);

                response.writeHead(200);
                response.end(template);
            });
        });
    } else if (pathname === '/update_process') {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', () => {
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            fs.rename(`data/${id}`, `data/${title}`, (error) => {
                fs.writeFile(`data/${title}`, description, 'utf8', (err) => {
                    response.writeHead(302, { location: `/?id=${title}` });
                    response.end();
                });
            });
        });
    } else if (pathname === '/delete_process') {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', () => {
            var post = qs.parse(body);
            var id = post.id;
            fs.unlink(`data/${id}`, (error) => {
                response.writeHead(302, { location: `/` });
                response.end();
            });
        });
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
    //console.log(__dirname + _url);
});
app.listen(3000);