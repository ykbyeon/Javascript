// function waitAndRun() {
//     setTimeout(() => {
//         console.log('끝');
//     }, 2000);
// }

// waitAndRun();


// function waitAndRun2() {
//     setTimeout(
//         () => {
//             console.log('1 call-back end');
//             setTimeout(
//                 () => {
//                     console.log('2 call-back end');
//                     setTimeout(
//                         () => {
//                             console.log('3 call-back end')
//                         }, 2000)
//                 }, 2000)
//         }, 2000);
// }

// waitAndRun2();


// const timeoutPromise = new Promise(
//     (resolve, reject) => {
//         setTimeout(() => {
//             resolve('완료');
//             console.log('----resolve----');
//         }, 2000)
//     }
// );


// timeoutPromise.then((res) => {
//     console.log('----then----');
//     console.log(res);
// });


// const getPromise = (seconds) => new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('완료');
//     }, seconds * 4000);
// });


// getPromise(1)
//     .then((res) => {
//         console.log('----1----');
//         console.log(res);

//         return getPromise(1);
//     }).then((res) => {
//         console.log('----2----');
//         console.log(res);

//         return getPromise(2);
//     }).then((res) => {
//         console.log('----3----')
//         console.log(res);
//     });



const getPromise = (seconds) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (seconds % 2 === 0) {
            resolve('완료');    // 짝수 초
        } else {
            reject('에러');     // 홀수 초
        }
    }, seconds * 1000);
});

getPromise(2)
    .then((res) => {
        console.log('----1 then----');
        console.log(res);

        return getPromise(2);
    }).catch((res) => {
        console.log('----1 catch----')
        console.log(res);

        return getPromise(2);
    }).then((res) => {
        console.log('----2 then----');
        console.log(res);

        return getPromise(1);
    }).catch((res) => {
        console.log('----2 catch----')
        console.log(res);

        return getPromise(2)
    }).then((res) => {
        console.log('----3 then----');
        console.log(res);
    }).catch((res) => {
        console.log('----3 catch----')
        console.log(res);
    }
    );

Promise.all([
    getPromise(2),
    getPromise(4),
    getPromise(2),
]).then((res) => {
    console.log('----all then----');
    console.log(res);
}).catch((res) => {
    console.log('----all catch----')
    console.log(res);
});

//결과도 list로 반환됨.
//모두 then일 때 모두 list로 결과 반환
//하나라도 catch로 빠지면 그 즉시 중단됨
