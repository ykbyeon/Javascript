/**
 * Async / Await
 */
const getPromise = (seconds) => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('완료');
    }, seconds * 1000 );
});

// async, await를 사용하면, 비동기 프로그래밍을 하지 않는 것처럼 비동기 프로그래밍을 할 수 있다.
// await는 promise에만 사용할 수 있다!!! (Promise로 만든 함수에만 사용 가능함.)
async function runner() {   // 함수선언을 할 때, 앞에 async를 넣어주면 async함수가 된다.
    // async함수 내에서는 await를 실행할 수 있다.
    const result1 = await getPromise(10);    // await를 이용해 수행한 함수의 결과값 받는 법(일반적인 함수의 결과 받드시 하면됨)
    // await를 쓰면 await한 함수가 끝날 때 까지 다음 코드가 수행되지 않지만,
    // thread를 막고 있지 않는다. 즉, 다른 함수가 실행 될 수 있다.
    console.log('runner1-result1');
    console.log(result1);

    const result2 = await getPromise(2);
    console.log('runner1-result2');
    console.log(result2);

    const result3 = await getPromise(1);
    console.log('runner1-result3');
    console.log(result3);
}

runner();
console.log('runner1 실행 끝');



// resolve는 잘 실행 됨. 그럼 reject 처리는 어떻게???
console.log('---------------------');

const getPromise2 = (seconds) => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('완료');
        //reject('에러');
    }, seconds);
});


// 함수에서 error는 어떻게 잡았는지? try...catch로 잡음!
async function runner2() {   // 함수선언을 할 때, 앞에 async를 넣어주면 async함수가 된다.
    // async함수 내에서는 await를 실행할 수 있다.
    try {
        const result1 = await getPromise2(1);    // await를 이용해 수행한 함수의 결과값 받는 법(일반적인 함수의 결과 받드시 하면됨)
        // await를 쓰면 await한 함수가 끝날 때 까지 다음 코드가 수행되지 않지만,
        // thread를 막고 있지 않는다. 즉, 다른 함수가 실행 될 수 있다.
        console.log('runner2-result1');
        console.log(result1);

        const result2 = await getPromise2(2);
        console.log('runner2-result2');
        console.log(result2);

        const result3 = await getPromise2(1);
        console.log('runner2-result3');
        console.log(result3);
    } catch (e) {
        console.log('runner2-catch');
        console.log(e);
    } finally {
        console.log('runner2-finally');
    }

}

runner2();
console.log('runner2 실행 끝');


// Promise를 만들어 .then / .catch로 체이닝 하는 것 말고도,
// async / await를 사용해서 비동기 프로그래밍을 할 수 있다. (현대에 더 많이 사용하는 프로그래밍 방법이다.)