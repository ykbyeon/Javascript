const promise1 = Promise.resolve('Success1');
const promise2 = Promise.resolve('Success2');

(async () => {
    for await (promise of [promise1, promise2]) {
        console.log(promise);
    }
})();


console.log('sync1');
console.log('sync2');
console.log('sync3');
console.log('sync4');
console.log('sync5');

(async () => {
    for (let i = 0; i < 10; i++) {
        console.log(`for loop sync : ${i}`);
    }
})();

console.log('sync6');
console.log('sync7');
console.log('sync8');
console.log('sync9');
console.log('sync10');

const fn = () => {
    for (let i = 0; i < 10; i++) {
        console.log(`for loop sync@fnPromise : ${i}`);
    }
};

const fnPromise = async () => {
    const p = new Promise((resolve, reject) => {
        resolve(fn);
    })
    return p;
};

fnPromise().then(f => { f(); });

console.log('sync11');
console.log('sync12');
console.log('sync13');
console.log('sync14');
console.log('sync15');