const http = require('http');
const fs = require('fs').promises;
const path = require('path');

http.createServer(async (req, res) => {
    try {
        console.log(req.method, req.url);
        if(req.method === 'GET') {
            if(req.url === '/'){
                const data = await fs.readFile(path.join(__dirname, 'restFront.html'));
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' });
                return res.end(data);
            } else if (req.url === '/about') {
                const data = await fs.readFile(path.join(__dirname, 'about.html'));
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8' });
                return res.end(data);
            } else if (req.url === '/users'){
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8'});
                return res.end(JSON.stringify(users));
            }

            
            //주소(req.url)이 /도 /about도 아니면
            try{
                const data = await fs.readFile(path.join(__dirname, req.url));
                return res.end(data);
            } catch (err) {
                // 주소에 해당하는 라우트를 찾지 못했다는 404 Not Found error 발생
            }
        }
        res.writeHead(404);
        return res.end('NOT FOUND');
    } catch (err) {
        console.error(err);
        res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(err.message);
    }
})
.listen(8082, () => {
    console.log('8082번 포트에서 서버 대기 중입니다.');
});