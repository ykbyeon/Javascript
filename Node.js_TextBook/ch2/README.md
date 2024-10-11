## Promise & Async, Await
### [ Promise ]
> #### 1. 용도   
> - 실행은 바로하고, 결과값 (resolve, reject)은 나중에 Return 받는 비동기 방식 수행 객체
> - 결과값은 실행 완료 후, then/catch로 받는다
> - 기본적으로 1 Process, 1 Thread로 실행되는 JavaScript언어에서,   
>   비동기 방식으로 수행되는 코드 작성을 위해
> #### 2. 문법구조
> - df
> - df
>
```javascript
const promise1 = new Promise((resolve, reject) => {
    if (false) {
        resolve('Pass');
    } else {
        reject('Fail');
    }
});

promise1.then((msg) => {
    console.log(msg);
}, (err) => {
    console.log(err);
});


const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("foo");
    }, 300);
  });


myPromise
  .then((value) => `${value} and bar 1 `)
  .then((value) => `${value} and bar again 2`)
  .then((value) => `${value} and again 3`)
  .then((value) => `${value} and again 4`)
  .then((value) => {
    console.log(value);
  })
  .catch((err) => {
    console.error(err);
  });
```
<br/>
<br/>

   
## [ Javascript ]
> #### 1. 인강
> - [🎬[유튜브] 기초학습 - WEB2-JavaScript (생활코딩)](https://www.youtube.com/playlist?list=PLuHgQVnccGMBB348PWRN0fREzYcYgFybf)
> - [🎬[유튜브] Javascript 무료 풀강의 (코드팩토리)](https://www.youtube.com/watch?v=ZOVG7_41kJE)   

> #### 2. 자료
> - [모던 JavaScript 튜토리얼](https://ko.javascript.info/)

> #### 3. 예제
> - [🎬[유튜브] 코딩테스트 스터디, 문제풀이 (코딩문)](https://www.youtube.com/playlist?list=PL3xNAKVIm80KhJzoz0N5VPROJq3IoLBIW)   
<br/>
<br/>

## [ node.js ]
> #### 1. 인강
> - [🎬[유튜브] 기초학습 - WEB2-Node.js (생활코딩)](https://www.youtube.com/playlist?list=PLuHgQVnccGMA9QQX5wqj6ThK7t2tsGxjm)   
> - [🎬[유튜브] 심화학습 - [Node.js] 백엔드 맛보기 (우리밋)](https://www.youtube.com/playlist?list=PLSK4WsJ8JS4cQ-niGNum4bkK_THHOizTs)
