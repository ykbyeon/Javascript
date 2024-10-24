const {even, odd} = require('./3-3-1_var'); //구조분해할당

function checkOddOrEven(num){
    if(num%2){
        return odd;
    }
    return even;
}

module.exports = checkOddOrEven;
