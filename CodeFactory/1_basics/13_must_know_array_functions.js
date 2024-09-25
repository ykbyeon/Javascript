/**
 * Array Methods
 * 
 * ** Methods는 향후 OOP를 할 때, Class나 Object에 대해 설명할 때 다루게 됨.
 * ** 간단히 Class에 귀속되는 함수들을 Method라고 부름.
 * ** 현 단계에서는 그냥 함수라고 생각해도 무방함..
 * 
 * --> 편의상 Array Functions라고 하겠음.
 */

let iveMembers = [
    '안유진',
    '가을',
    '레이',
    '장원영',
    '리즈',
    '이서',
]

console.log(iveMembers);

// push()
// 값 자체를 직접 변경한다.
console.log(iveMembers.push('코드팩토리'));
console.log(iveMembers);
console.log('--------------');

// pop()
// 마지막 값을 반환 받고, 이 값을 삭제한다.
console.log(iveMembers.pop());
console.log(iveMembers);
console.log('--------------');

// shift()
// 첫번째 값을 반환 받고, 이 값을 삭제한다.
console.log(iveMembers.shift());
console.log(iveMembers);
console.log('--------------');

// unshift
// 첫번째 자리에 값을 넣고, Array의 길이(갯수)를 반환한다.
console.log(iveMembers.unshift('안유진'));
console.log(iveMembers);
console.log('--------------');

//splice
console.log(iveMembers.splice(0, 3));
console.log(iveMembers);

iveMembers = [
    '안유진',
    '가을',
    '레이',
    '장원영',
    '리즈',
    '이서',
];

console.log(iveMembers);

// concat()
// 원래 Array를 변경하지 않고, 새로운 Array를 생성해서 반환한다. Push와의 차이점
console.log(iveMembers.concat('코드팩토리'));
console.log(iveMembers);

// slice()
console.log(iveMembers.slice(0, 3));
console.log(iveMembers);

// spread operator
let iveMembers2 = [
    ...iveMembers,
];
console.log(iveMembers2);

let iveMembers3 = [
    iveMembers,
];
console.log(iveMembers3);

console.log('----------------');
let iveMembers4 = iveMembers;  // (주의!!!)iveMembers4는 새로운 Array가 아니라, iveMembers 와 동일한 주소값을 가리키는 것.
console.log(iveMembers4);

console.log(iveMembers === iveMembers4);

// iveMembers4.push('코드팩토리');
// console.log(iveMembers);

// iveMembers2.push('코드팩토리');
// console.log(iveMembers2);
// console.log(iveMembers);

console.log('----------------');
console.log([
    ...iveMembers,
] === iveMembers);  // Spread Operator를 사용한 경우, 새로운 메모리 공간을 할당받은 신규 Array가 만들어진 것임.




/**
 * 몇가지 유용한 함수. 매우 많이 사용한다.
 */

// join()
console.log(iveMembers.join()); // array에 그냥 join()을 사용하면 ',' 기준으로 모든 Array값을 합친 string을 반환한다.
//  -> 안유진,가을,레이,장원영,리즈,이서
console.log(typeof iveMembers.join()); // string
console.log(iveMembers.join('/'));
console.log(iveMembers.join(', '));



// sort() : 오름차순 정렬
iveMembers.sort(); // sort()는 반환값이 없다.
console.log(iveMembers); // 원래 array의 값 자체가 변경된 것을 알 수 있다.

console.log(iveMembers.reverse());
console.log(iveMembers);


let numbers = [
    1,
    9,
    7,
    5,
    3,
];
console.log(numbers);

// a, b를 비교했을 때
// 1) a를 b 보다 나중에 정렬하려면(뒤에 두려면) 0보다 큰 숫자를 반환
// 2) a를 b 보다 먼저 정렬하려면(앞에 두려면) 0보다 작은 숫자를 반환
// 3) 원래 순서를 그대로 두려면, 0을 반환
numbers.sort((a, b) => {
    return a > b ? 1 : -1;
});
console.log(numbers);

numbers.sort((a, b) => a > b ? -1 : 1);
console.log(numbers);


console.log('---------');
// map()
// 원래의 array를 변형하지 않고, 새로운 array를 반환해 준다. 
console.log(iveMembers.map((x) => x));
console.log(iveMembers.map((x) => `아이브: ${x}`));
console.log(iveMembers.map((x) => {
    if (x === '안유진') {
        return `아이브: ${x}`;
    } else {
        return x;
    }
}));

console.log(iveMembers); //원래 iveMembers라는 array는 변경되지 않았다.
//Map함수도 원래 array를 변경하지 않고, 새로운 array를 생성해서 반환한다.


// filter()
numbers = [1, 8, 7, 6, 3];
console.log(numbers.filter((x) => x % 2 === 0));


// find()
// filter는 모든 값들을 순회하면서 실행되지만, find는 순서대로 보다가 해당되는 첫번째 값만 반환한다.
console.log(numbers.find((x) => x % 2 === 0));


// findIndex()
console.log(numbers.findIndex((x) => x % 2 === 0));


// reduce()
// 보충설명 keynote 참조
console.log(numbers.reduce((p, n) => p + n, 0));