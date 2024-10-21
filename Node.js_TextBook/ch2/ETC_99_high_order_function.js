/**
 * High Order Function
 */
console.log("======= High Order Function =======")

const fnCall = (fn, num) => {
    let result;
    console.time("speed");
    result = fn(num);
    console.timeEnd("speed");
    return result;
}

const fn001 = (t) => {
    return t * t;
}

const fn002 = (t) => {
    return t + t;
}

const r1 = fnCall(fn001, 10);
console.log(r1);
const r2 = fnCall(fn002, 10);
console.log(r2);

const fnArr = [fn001, fn002];

const initValue = 999;
const vv = fnArr.reduce((r, f, idx, arr) => {
    return f(r);
}, initValue);
// Turn:    accum.      currVal.        returnVal.
// 1:       999         fn001(999)      999*999
// 2:       999*999     fn002(999*999)  999*999 + 999*999


//위 reduce는 결국 아래와 동일한 결과값을 도출함
let vvv = (initValue * initValue);
vvv += vvv;

console.log(vv, vvv);
