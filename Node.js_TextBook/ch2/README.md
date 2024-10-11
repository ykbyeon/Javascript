## Promise & Async, Await
### [ Promise ]
#### 1. 용도   
- 실행은 바로하고, 결과값 (resolve, reject)은 나중에 Return 받는 비동기 방식 수행 객체
- 결과값은 실행 완료 후, then/catch로 받는다
- 기본적으로 싱글스레드로 실행되는 JavaScript언어에서,   
  비동기 방식으로 수행되는 코드 작성을 위해 사용함.   
  (setTimeout 함수를 이용한 구현시 발생하는 Callback-Hell 문제를 해결하기 위해 나온 신규 문법)
- [(MDN)Promise설명](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- 3개의 상태가 존재   
  - 대기(pending): 이행하지도, 거부하지도 않은 초기 상태.   
  - 이행(fulfilled): 연산이 성공적으로 완료됨.   
  - 거부(rejected): 연산이 실패함.
  ![image](https://github.com/user-attachments/assets/fbc75d00-dec4-4b27-b01e-1868fcc9d4d5)


#### 2. 문법구조
- resolve, reject 매개변수를 갖는 콜백함수를 구현하며 생성
- 객체 생성 시점에 내부 프로세스는 수행되며, 결과값 Return만 .then / .catch 메소드 호출 시점에 수행됨
- .catch 는 .then( undefined, failureCallback) 와 동일
```javascript
const promise1 = new Promise((resolve, reject) => {
    if (false) {
        console.log('Promise True Logic');
        resolve('Pass');
    } else {
        console.log('Promise Fail Logic');
        reject('Fail');
    }
});

console.log('sync Process 1');
console.log('sync Process 2');

promise1.then((msg) => {
    console.log(msg);
}, (err) => {
    console.log(err);
});
```

```
========== [Result] ==========
Promise Fail Logic
sync Process 1
sync Process 2
Fail
```
<br/>
   
- .then() 여러번 사용하여 여러개의 콜백을 추가 할 수 있으며, 각각의 콜백은 주어진 순서대로 하나 하나 실행
  ※ 성능상 좋지 않으며, 가능한 하나의 핸들러 내에서 수행토록 작성
```
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

```
========== [Result] ==========
foo and bar 1  and bar again 2 and again 3 and again 4
```
<br/>
<br/>

<!--
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
-->
