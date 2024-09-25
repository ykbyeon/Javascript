/**
 * Loops
 * 
 * 1) for
 * 2) while
 */

for (let i = 0; i < 10; i++) {
    console.log(i);
}
console.log('-------------');
for (let i = 10; i > 0; i--) {
    console.log(i);
}

console.log('-------------');
for (let i = 0; i < 3; i++) {
    for (let j = 3; j > 0; j--) {
        console.log(i, j);
    }
}


// *를 이용해서 6x6의 정사각형을 출력해라.
let square = '';
let side = 6;
for (let i = 0; i < side; i++) {
    for (let j = 0; j < side; j++) {
        square += '*';
    }
    square += '\n'
}
console.log(square);


/**
 * for...in 루프
 * 
 * 루핑을 할 때 마다 키값을 입력받을 수 있다.
 */

const yuJin = {
    name: '안유진',
    year: 2003,
    group: '아이브',
}

console.log('---------------');

// for in loop에서 object는 key값을 받을 수 있음
for (let key in yuJin) {
    console.log(key);
}

console.log('---------------');
const iveMembersArray = ['안유진', '가을', '레이', '장원영', '리즈', '이서'];

// for in loop에서 Array는 index값을 받을 수 있음
for (let key in iveMembersArray) {
    console.log(key);
    console.log(`${key}:${iveMembersArray[key]}`)
};

/**
 * for...of 루프
 * 
 * iterable, 즉 루핑을 할 수 있는 값들에서만 사용할 수 있다. (예, list, 즉 array에서 사용할 수 있다.)
 * 값을 가져올 수 있다.
 */

// yuJin is not iterable
// for(let value of yuJin){
//     console.log(value);
// }

for (let value of iveMembersArray) {
    console.log(value);
}


/**
 * While
 */

let number = 0;

while (number < 10) {
    number++;
    console.log(number);
}


/**
 * do...while
 * 
 * 이 문법은 실무적으로 잘 사용하지 않는다.
 */

number = 0;

do {
    number++;
} while (number < 10);

console.log(number);


/**
 * break
 * 
 * 루프를 깨고 중단시킨다.
 */
console.log('----------------');
for (let i = 0; i < 10; i++) {
    if (i === 5) {
        break;
    }
    console.log(i);
}

console.log('-----------');
number = 0;

while (number < 10) {
    if (number === 5) {
        break;
    }
    number++;
    console.log(number);
}


/**
 * continue
 * 
 * 루프 진행을 skip하고 다음 루프턴으로 진행
 */
console.log('--------------');
for (let i = 0; i < 10; i++) {
    if (i === 5) {
        continue;
    }
    console.log(i);
}


console.log('---------');
number = 0;

while(number < 10){
    number++;
    if(number === 5){
        continue;
    }
    console.log(number);
}