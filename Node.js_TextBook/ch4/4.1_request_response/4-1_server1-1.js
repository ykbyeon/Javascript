const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>')
    res.write('<h2>server1-1 file</h2>');
    res.end('<p>Hello Server!</p>');
});

server.listen(8080, () => {   //서버연결
    console.log('8080번 포트에서 서버 대기 중입니다!');
});

server.on('listening', () => {
    console.log('listening중 입니다.');
});

server.on('error', (err) => {
    console.errors('error:', err)
});