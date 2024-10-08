/**
 * Callback
 * 
 * 콜백함수 : 특정 작업이 끝나고서 다시 불리는 함수. 즉 정의가 되고나서 바로 수행되지 않는다.
 *          ※ 콜백 : 다시 불리다...
 */
function waitAndRun() {
    setTimeout(() => {
        console.log('끝');
    }, 2000);
}

//waitAndRun();

function waitAndRun2() { 
    setTimeout(() => {
        console.log('1번 콜백 끝');
        setTimeout(() => { 
            console.log('2번 콜백 끝');
            setTimeout(() => {
                console.log('3번 콜백 끝');
            }, 2000);
        }, 2000);
    }, 2000);
}

//waitAndRun2();

// 위처럼 callback이 반복되면 코드 가독성도 안좋아지고, 기능파악이 잘 안된다.
// 이러한 것을 대체할 명령어이 나옴 -> promise


/**
 * Promise
 */
// Promise의 callback함수는 2개의 파라미터를 받는다.
// 첫번째 파라미터는 resolve
//
// 두번째 파라미터는 reject
console.log('--------------------------------');
const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('완료');
    }, 2000);


});

/* timeoutPromise.then((res) => {
    console.log('-----then-----');
    console.log(res);
}); */
// 위에서 실행을 해보면,
// resolve라는 함수를 실행하는 순간에
// 우리가 반환받은(생성한) 객체에서 .then을 붙여주면,
// resolve가 실행되는 시점의 반환 값을 받을 수가 있다.




// Promise의 활용법
// => Promise를 반환하는 함수를 만들 수 있다.
//    어떻게 사용하는지????
const getPromise = (seconds) => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('완료');
    }, seconds * 1000); // 입력값 sec를 ms로 변환
});
// 함수가 Promise 객체를 반환한다.
// 여기서부터 Promise의 진가가 나타남. (여러개의 Promise를 연결할 수가 있다.)
getPromise(3)
    .then((res) => {
        console.log('----- first then(1) -----');
        console.log(res);

        return getPromise(3);
    }).then((res) => {
        console.log('----- second then(1) -----');
        console.log(res);

        return getPromise(4);
    }).then((res) => {
        console.log('----- third then(1) -----');
        console.log(res);

        return getPromise(4);
    });



// Promise의 Promise의 callback함수 두번째 파라미터 reject의 용도
const getPromise2 = (seconds) => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('완료');
        // reject('에러'); //에러가 발생환 상황에서 값을 return할 때 reject를 사용한다.

        // if (xxx) {
        //     resolve('성공');
        // } else {
        //     reject('에러');
        // }
    }, seconds * 1000); // 입력값 sec를 ms로 변환
});

getPromise2(3)
    .then((res) => {
        console.log('----- first then(2) -----');
        console.log(res);
    })
    .catch((res) => {   // try...catch 에서의 catch와 동일. 에러 발생 시 수행되는 코드
        console.log('----- first catch(2) -----');
        console.log(res);
    })
    .finally(() => {    // finally 는 파라미터를 받지 않는다.
        console.log('----- finally(2) -----');
    });



// (Tip) 서로 의존적이지 않은 여러개의 Promise를 동시에 실행시킬 수도 있다.(Promise는 async로 수행됨)
Promise.all([  // 실행시키고자 하는 Promise들을 List로 입력해준다)
    getPromise2(1),
    getPromise2(4),
    getPromise2(1),
]).then((res) => {
    console.log('----- all then(2) -----');
    console.log(res);
}).catch((res) => {
    console.log('----- all catch(2) -----');
    console.log(res);
});