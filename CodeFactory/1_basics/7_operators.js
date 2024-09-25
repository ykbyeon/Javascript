/**
 * Operators
 * 
 * 연산자
 */


/**
 * 산술 연산자
 * 
 * 1) 덧셈
 * 2) 뺄셈
 * 3) 곱셈
 * 4) 나눗셈
 * 5) 나머지
 */

console.log(10 + 10);
console.log(10 - 10);
console.log(10 * 10);
console.log(10 / 10);
console.log(10 % 10);
console.log(10 % 3);

console.log('--------------');


console.log(10 * (10 + 10));

/**
 * 증가와 감소
 */

let number = 1;
number++;
console.log(number);

number--;
console.log(number);
console.log('-------------');

/**
 * 연산자의 위치
 */

let result = 1;
console.log(result);

result = number++;
console.log(result, number);

result = number--;
console.log(result, number);


result = ++number;
console.log(result, number);

result = --number;
console.log(result, number);
// 현실적으로 코딩을 할 때 위처럼 증가 감소 연산자를 앞쪽에 쓰는 경우는 없다.
// 증가,감소 연산자는 항상 뒤에 쓰는 것을 기본적인 원칙으로 할 것!!!! (일반적인 프로그래머들이 사용하는 규칙!!!)

/**
 * 숫자 타입이 아닌 타입에 +,-를 사용하면 어떻게 될까?
 */

let sample = '99';

console.log(+sample);
console.log(typeof +sample); //숫자로 변경될 수 있는 string은 number 가 됨

console.log(sample);
console.log(typeof sample); // number타입임. 실제로 sample자체의 Type이 변경된 것은 아님.

sample = true;
console.log(+sample);   // 1
console.log(typeof +sample);    // number

sample = false;
console.log(+sample);   // 0
console.log(typeof +sample);    // number

sample = '안유진'
// NaN -> NOt a Number
console.log(+sample);   // NaN. 숫자가 아닌 String을 변경했을 때 나온는 타입

console.log('----------');

sample = '99';
console.log(-sample);   // -99
console.log(typeof -sample);    // number

console.log(sample);    // 99
console.log(typeof sample); // string

sample = true;
console.log(-sample);   // -1
console.log(typeof -sample);    // number

sample = false;
console.log(-sample);   // -0
console.log(typeof -sample);    // number

sample = '안유진'
// NaN -> NOt a Number
console.log(-sample);   // NaN

/**
 * 할당 연산자 (assignment operator)
 * 
 */

number = 100;
console.log(number);

number += 10;
console.log(number);

number -= 10;
console.log(number);

number *= 10;
console.log(number);

number /= 10;
console.log(number);

number %= 10
console.log(number);


/**
 * 비교 연산자
 * 
 * 1) 값의 비교 (직관적이지 않은 결과가 많아, 실무적으로 사용되지 않는다.)
 * 2) 값과 타입의 비교 (실질적으로 이 것만 사용된다.)
 */

//실무에서는 == 비교는 사용되지 않는댜
console.log(5 == 5);
console.log(5 == '5');
console.log(0 == '');
console.log(true == 1);
console.log(false == 0);
console.log(true == '1');

//실무에서는 === 비교(값 & 타입 모두 비교)만 사용된다고 봐도 무방함
console.log(5 === 5);
console.log(5 === '5');
console.log(0 === '');
console.log(true === 1);
console.log(false === 0);
console.log(true === '1');

console.log('---------------');

// ! 같지않다는 의미
console.log(5 != 5);
console.log(5 != '5');
console.log(0 != '');
console.log(true != 1);
console.log(false != 0);
console.log(true != '1');

console.log('---------------');

// 
console.log(5 !== 5);
console.log(5 !== '5');
console.log(0 !== '');
console.log(true !== 1);
console.log(false !== 0);
console.log(true !== '1');
console.log('---------------');


/**
 * 대소 관계 비교 연산자
 */
console.log(100 > 1);
console.log(100 < 1);
console.log(100 <= 1);
console.log(100 >= 1);

/**
 * 삼항 조건 연산자 (ternary operator)
 */

//조건이 참이면 : 왼쪽값이 반환. 조건이 거짓이면 : 오른쪽값이 반환.
console.log(10 > 0 ? '10이 0보다 크다' : '10이  0보다 작거나 같다');

console.log('---------');

/**
 * 논리 연산자
 * 
 * 1) &&
 * 2) ||
 */

// &&조건은 모두 true여야 true를 반환한다.
console.log(true && true);
console.log(true && false);
console.log(false && true);
console.log(false && false);

console.log('--------');

// ||는 하나만 true여도 true를 반환한다.
console.log(true || true);
console.log(true || false);
console.log(false || true);
console.log(false || false);

console.log('--------');


console.log(10 > 1 && 20 > 2);
console.log(10 < 1 && 20 > 2);
console.log(10 < 1 && 20 < 2);

console.log(10 > 1 || 20 > 2);
console.log(10 < 1 || 20 > 2);
console.log(10 < 1 || 20 < 2);

console.log('---------------');

/**
 * 단축평가 (short circuit evaluation)
 * 
 * 실무적으로 많이 사용된다. 익숙해지도록 외우자!!!
 * 
 * &&를 사용했을 때 좌측이 true면 우측값 반환
 * &&를 사용했을 때 좌측이 false면 좌측값 반환
 * ||를 사용했을 때 좌측이 true면 좌측값 반환
 * ||를 사용했을 때 좌측이 false면 우측값 반환
*/

console.log(true || '아이브');
console.log(false || '아이브');
console.log(false && '아이브');
console.log(true && '아이브');

//이 기능의 장점이자 단점은(기능이 복잡해 지는 것은), 계속해서 연결해 나갈 수 있다는 것...
console.log(true && true && '아이브'); // 아이브
console.log(true && false && '아이브'); // false


/**
 * 지수 연산자
 */

console.log(2 ** 2);
console.log(10 ** 3);

/**
 * null 연산자
 * 
 */

let name;
console.log(name);

name = name ?? '코드팩토리'; // ??연산자 : 좌측값이 null or undefined일 때, 오른쪽값을 반환한다.
console.log(name);

name = name ?? '아이브';
console.log(name);

let name2;
name2 ??= '코드팩토리'; //  name = name ?? '코드팩토리'; 와 동일 문법
console.log(name2);

