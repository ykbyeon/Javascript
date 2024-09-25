/**
 * copy by value 값에 의한 전달
 * copy by reference 참조에 의한 전달
 * 
 * 1) 기본적으로 모든 primitive 값은 copy by value다
 *      - Object를 제외하고, 생성되는 모든 다른 데이터 타입들은 primitive다
 *      - Function, Array도 Object 이다.
 *      - 즉 Object는 총 3가지(Object, Function, Array)가 존재함.
 * 2) 객체는 copy by reference 다.
 */

let original = '안녕하세요';
let clone = original;

console.log(original, clone);

console.log('------------------');
clone += ' 안유진 입니다.';
console.log(original);
console.log(clone);



console.log('-----------------');
let originalObj = {
    name: '안유진',
    group: '아이브',
};

let cloneObj = originalObj;

console.log(originalObj);
console.log(cloneObj);

console.log('-----------------');

originalObj['group'] = '코드팩토리';
console.log(originalObj);
console.log(cloneObj);

console.log(originalObj === cloneObj);
console.log(original === clone);

originalObj = {
    name: '최지호',
    group: '코드팩토리',
};
cloneObj = {
    name: '최지호',
    group: '코드팩토리',
};
console.log(originalObj === cloneObj);

console.log('-------------------');

const yuJin1 = {
    name: '안유진',
    group: '아이브',
};
const yuJin2 = yuJin1;
const yuJin3 = {
    name: '안유진',
    group: '아이브',
};

console.log(yuJin1 === yuJin2); // true
console.log(yuJin1 === yuJin3); // false
console.log(yuJin2 === yuJin3); // false


console.log('----------------');
/**
 * Spread Operator
 * 
 * array에만 존재하는게 아니라 object에서도 같은 개념으로 존재함.
 */

const yuJin4 = {
    ...yuJin3,  // Copy by Value로 된다.
};
console.log(yuJin4);
console.log(yuJin4 === yuJin3);

//새로운 property와 함께 spread operator를 사용할 수 있다.
const yuJin5 = {
    year: 2003,
    ...yuJin3,
};
console.log(yuJin5);

// spread operator는 사용할 때, 그 순서가 중요하다.
const yuJin6 = {
    name: '코드팩토리',
    ...yuJin3,  // spread operator에 의해, 윗줄에서 선언한 name값이 덮어써지게 된다.
};
console.log(yuJin6);

const yuJin7 = {
    ...yuJin3,
    name: '코드팩토리',
};
console.log(yuJin7);



//-------------------------------
// array도 동일함

const numbers = [1, 3, 5];

// const numbers2 = [
//     10,
//     ...numbers,
// ];
// console.log(numbers2);

numbers2 = [
    ...numbers,
    10,
];

console.log(numbers2);