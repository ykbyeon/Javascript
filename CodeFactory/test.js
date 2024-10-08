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


const timeoutPromise = new Promise(
    (resolve, reject) => {
        setTimeout(() => {
            resolve('완료');
        }, 2000)
    }
);

timeoutPromise.then((res) => {
    console.log('----then----');
    console.log(res);
});