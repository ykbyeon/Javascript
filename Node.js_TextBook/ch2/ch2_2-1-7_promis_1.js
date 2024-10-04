//const condition = true; //true이면 resolve, false이면 reject
const condition = false;

const promise = new Promise((resolve, reject) => {
    if (condition) {
        resolve('성공');
    } else {
        reject('실패');
    }
});

// 다른 코드가 들어갈 수 있음.

promise
    .then(message => {
        console.log(message);
    })
    .catch(error => {
        console.error(error);
    })
    .finally(() => {
        console.log('무조건');
    });



