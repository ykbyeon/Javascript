/**
 * function -> 함수
 */

/**
 * 만약에 2라는 숫자에 * 10/2 %3를 스트링으로 변환해서 반환받고 싶다면 어떻게 해야할까?
 */

console.log((2 * 10 / 2 % 3).toString());
console.log((3 * 10 / 2 % 3).toString());

/**
 * DRY
 * D -> Don't
 * R -> Repeat
 * Y -> Yourself
 */


function calculate() {
    console.log((2 * 10 / 2 % 3).toString());
}

//calculate();

function calculate(number) {
    console.log((number * 10 / 2 % 3).toString());
}

calculate(4);

/**
 * 함수에서 입력받는 값에 대한 정의를 Parameter라고한다.
 * 실제로 입력하는 값은 argument라고한다.
 * 위 예에서, number -> parameter / 4 -> argument
 */

calculate(5);


function multiply(x, y) {
    console.log(x * y);
}

multiply(2, 4);

function multiply(x = 3, y = 10) {
    console.log(x * y);
}

multiply(2, 4);

multiply(undefined, 4);

/**
 * 반환받기
 * 
 * return 받기
 */
console.log('------');

function multiply(x, y) {
    //console.log(x * y);
    return x * y;
}

const result1 = multiply(2, 4);
console.log(result1);

const result2 = multiply(4, 5);
console.log(result2);


/**
 * Arrow 함수
 */
const multiply2 = (x, y) => {
    return x * y;
}

console.log(multiply2(3, 4));
// Arrow함수와 일반 함수가 기능적으로 완전하게 동일하지는 않음.
// 위처럼 일반적으로 사용하는 상황에서는 똑같다고 생각해도 됨.
// 차이점에 대해선, 향후 Class와 Object에 대해서 자세하게 설명할 때 알 수 있게 될 것.



const multiply3 = (x, y) => x * y;
console.log(multiply3(4, 5));

const multiply4 = x => x * 2;
console.log(multiply4(2));

const multiply5 = x => y => z => `x: ${x} y: ${y} z: ${z}`;
console.log(multiply5(2)(5)(7));

function multiply6(x) {
    return function (y) {
        return function (z) {
            return `x: ${x} y: ${y} z: ${z}`;
        }
    }
}

console.log(multiply6(3)(4)(5));

const multiplyTwo = function (x, y) {
    return x * y;
}
console.log(multiplyTwo(4, 5));

console.log('-------------');

const multiplyThree = function (x, y, z) {
    console.log(arguments);
    return x * y * z;
}

console.log(multiplyThree(4, 5, 6));


const multiplyAll = function (...arguments) { //무한하게 Argument받을 수 있음
    return Object.values(arguments).reduce((a, b) => a * b, 1);
}

console.log(multiplyAll(3, 4, 5, 6, 7, 8, 9, 10));
// console.log(typeof multiplyAll(3,4,5,6));

//즉시실행 함수 immediately invoked function
(function (x, y) {
    console.log(x * y);
})(4, 5);

console.log(typeof multiply);
console.log(multiply instanceof Object);  // instanceof : 좌측에 있는 것이 오른쪽에 있는 것과 같은 타입인지 문의하는 명령어
// Javascript에서 함수는 Object이다...이점을 꼭 기억하고 있자!!!
