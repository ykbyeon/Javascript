/**
 * 타입 변환
 * Type Conversion
 * 
 * 1) 명시적
 * 2) 암묵적
 */


let age = 32; // number

//명시적
let stringAge = age.toString();
console.log(typeof stringAge, stringAge);

let test = age + '';
console.log(typeof test, test);

//암묵적
console.log('98' + 2); // 2가 String으로 변환된 것
console.log('98' * 2); // 98이 숫자로 변환된 것
console.log('98' - 2); // 98이 숫자로 변환pase된 것

// 위 암묵적인 예시는 기능적으로 가능하다는 것을 보여주는 것 뿐, 실제로 사용하라는 것이 아님.
// 아래와 같이 누가봐도 프로그래머의 의도가 명확하게 보0이도록 코딩해줘야 하는 것이 맞다.
//console.log('98' + '2'); 
//console.log(98 * 2); 
//console.log(98 - 2); 
//항상 타입이 같은 것끼리 연산하도록 할 것!!!

console.log('----------');
/**
 * 명시적 변환 몇가지 더 배우기
 */

console.log(typeof (99).toString(), (99).toString());
console.log(typeof (true).toString(), (true).toString());
console.log(typeof (Infinity).toString(), Infinity);

//숫자 타입으로 변환
console.log(typeof parseInt('0'), parseInt('0'));
console.log(typeof parseFloat('0.99'), parseFloat('0.99'));
console.log(typeof parseInt('0.99'), parseInt('0.99'));
console.log(typeof +'1', +'1');

console.log('--------------');
/**
 * Boolean 
 * 
 * 실무에서도 자주 쓰인다
 * String 값 안에 값이 있으면 true
 */
console.log(!!'x');
console.log(!!'');

console.log(!!0);
console.log(!!'0');
console.log(!!'false');
console.log(!!false);
console.log(!!undefined);
console.log(!!null);

console.log(!!{});  // {} -> object. Key,Value pair. object는 값이 비어있던, 들어있던 무조건 true임
console.log(!![]);  // [] -> array. array도 값이 비어있던, 들어있던 무조건 true임

/**
 * 1) 아무 글자도 없는 String
 * 2) 값이 없는 경우
 * 3) 0
 * 
 * 모두 false를 반환한다.
 */
                    
