const { even, odd } = require('./3-3-1_var'); //구조분해할당
const checkNumber = require('./3-3-1_func');


function checkStringOddOrEven(str) {
    if (str.length % 2) {
        return odd;
    }
    return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));
