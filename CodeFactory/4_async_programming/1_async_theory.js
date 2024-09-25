/**
 * Async theory
 */

// --------------------------------------------
// //동기 프로그램밍
// function longWork() {
//     const now = new Date();

//     /**
//      * milliseconds since epoch
//      * 1970년도 1월 1일 부터 지금 코드가 실행되는 순간까지의 시간을 밀리초로 반환한다.
//      */
//     const milliseconds = now.getTime();
//     const afterTwoSeconds = milliseconds + 2 * 1000;

//     while (new Date().getTime() < afterTwoSeconds) {
//         //2초동안 while 루프 수행됨
//     }
//     console.log('완료');
// }

// console.log('Hello');
// longWork();
// console.log('World');
// --------------------------------------------



// 비동기 프로그래밍
function longWork() {
    // setTimeout은 비동기로 수행되도록 원래부터 설계되어 있는 내장함수
    setTimeout(() => {
        console.log('완료');
    }, 2000)   // 1번 파라미터 : 함수,  2번 파라미터 : 몇초(ms단위로 입력) 기다렸다가 1번 파라미터 함수를 수행할지  
}

console.log('Hello');
longWork();
console.log('World');
