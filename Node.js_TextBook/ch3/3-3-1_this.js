console.log(this);
console.log(this === module.exports);
console.log(this === exports);

function whatIsThis() {
    console.log('function', this === exports, this === global); //함수선언문 내에서의 this는 global을 가리킴.
}

whatIsThis();
