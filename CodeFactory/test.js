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
        //resolve('완료');
        reject('에러');
    }, seconds * 1000);
});

getPromise(1)
    .then((res) => {
        console.log('----1----');
        console.log(res);

        return getPromise(1);
    }).catch((res) => {
        console.log('----1 catch----')
        console.log(res);
    })