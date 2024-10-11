// console.log('aa' || 'human');
// console.log('human' || 'human');

// var Human = function (type) {
//     this.type = type || 'human';
// };


// const man = new Human('aa');


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