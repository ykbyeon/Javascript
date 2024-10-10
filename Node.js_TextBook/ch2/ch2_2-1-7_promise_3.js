const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('success1');
const promise3 = Promise.reject('Fail3');

Promise.allSettled([promise1, promise2, promise3])
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });


function syncDelay(milliseconds) {
    var start = new Date().getTime();
    var end = 0;
    while ((end - start) < milliseconds) {
        end = new Date().getTime();
    }
}

try {
    Promise.reject('error')
        .catch((err) => {
            //setTimeout( (a) =>  console.log(a), 0);  // 비동기 방식
            syncDelay(5000);    // 동기 방식 Delay
            console.log(err);
        }
        )
} catch (e) {
    console.error(e);
}
