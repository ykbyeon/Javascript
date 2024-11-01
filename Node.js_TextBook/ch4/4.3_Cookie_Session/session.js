const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

const session = {};

http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);

    //주소가 /login으로 시작하는 경우
    if (req.url.startsWith('/login')) {
        const url = new URL(req.url, 'http://localhost:8084');
        const name = url.searchParams.get('name');
        const expires = new Date();
        //쿠키 유효시간을 현재 시간 + 5분으로 설정
        expires.setMinutes(expires.getMinutes() + 5);

        const uniqueInt = Date.now();
        session[uniqueInt] = {
            name,
            expires
        };

        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    } else if (cookies.session && session[cookies.session] !== undefined ? session[cookies.session].expires : new Date() - 1 > new Date()) {    //세션 쿠키가 존재하고, 만료 기간이 지나지 않았다면
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`${session[cookies.session].name}님 안녕하세요.`);
    } else {    //주소가 /이면서 name이라는 쿠키가 없는 경우
        try {
            const data = await fs.readFile(path.join(__dirname, 'cookie2.html'));
            res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
            res.end(data);
        } catch (err) {
            console.error(err);
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
            res.end(err.message);
        }
    }
})
    .listen(8085, () => {
        console.log('8085번 포트에서 서버 대기 중입니다.!');
    });