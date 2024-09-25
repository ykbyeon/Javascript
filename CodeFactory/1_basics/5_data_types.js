/**
 * Data Types
 * 
 * 여섯개의 Primitive Type과
 * 한개의 오브젝트 타입이 있다.
 * 
 * 1) Number (숫자)
 * 2) String (문자열)
 * 3) Boolean (불리언)
 * 4) undefined (언디파인드)
 * 5) null (널)
 * 6) Symbol (심볼)
 * 
 * 7) Object (객체)
 *    Function
 *    Array
 *    Object
 */


const age = 32;
const temperature = -10;
const pi = 3.14;

console.log(typeof age);
console.log(typeof temperature);
console.log(typeof pi);
console.log('---------------------');


const infinite = Infinity;
const nInfinite = -Infinity;

console.log(typeof infinite);
console.log(typeof nInfinite);
console.log('---------------------');


/**
 * String Type
 */

const codeFactory = '코드팩토리';
console.log(codeFactory);
console.log(typeof codeFactory);


const ive = "'아이브' 안유진";
console.log(ive);


/**
 * Template Literal
 * 
 * Escaping Character
 * 1) newline -> \n
 * 2) tab -> \t
 * 3) 백슬래시를 스트링으로 표현하고 싶다면 두번 입력
 */

const iveYuJIn = '아이브\n안유진'
console.log(iveYuJIn);

const iveWonYoung = '아이브\t장원영';
console.log(iveWonYoung);

const backSlash = '아이브\\코드팩토리';
console.log(backSlash);

const smallQuotation = '아이브\'코드팩토리';
console.log(smallQuotation);

const iveWonYoung2 = `아이브 ' " ///\\\\\/
장원영`;
console.log(iveWonYoung2);
console.log(typeof iveWonYoung2);

const groupName = '아이브';
console.log(groupName + ' 안유진');
console.log(`${groupName} 안유진`);
console.log('-------------');


/**
 * Boolean 타입
 */

const isTrue = true;
const isFalse = false;

console.log(typeof isTrue);
console.log(typeof isFalse);


/**
 * undefined
 * 
 * 사용자가 직접 값을 초기화하지 않았을 때 지정되는 값이다.
 * 
 * 직접 undefined로 값을 초기화하는 건 지양해야 한다.
 */

let noInit;
console.log(noInit);
console.log(typeof noInit);

/**
 * null 타입
 * 
 * undefined와 마찬가지로 값이 없다는 뜻이나
 * JS에서는 개발자가 명시적으로 없는 값으로 초기화할 때 사용된다.
 */
let init = null;
console.log(init);
console.log(typeof init);  // null은 object 타입으로 나온다. 개발자도 인정한 JS의 버그임. 
// null타입으로 수정되지 않는 이유는, 이미 null이 object 타입이라는 전제로
// 작성되어진 legacy JS 코드들이 너무 많아 수정하지 못한 것.
// 그냥 null의 타입은 object라고 알고가면 된다. 중요한 문제는 아님.
console.log('-------');

/**
 * Symbol 타입
 * 
 * 유일무이한 값을 생성할 때 사용한다.
 * 다른 프리미티브 값들과 다르게 Symbol함수를 호출해서 사용한다.
*/

const test1 = '1';
const test2 = '1';

console.log(test1 === test2);

const symbol1 = Symbol('1');
const symbol2 = Symbol('1');

console.log(symbol1 === symbol2);
console.log('-------');


/**
 * Object 타입
 * 
 * Map타입과 유사하다고 생각하면 된다.
 * 키:밸류의 쌍으로 이루어져 있다.
 * key:value fair
 */

const dictionary = {
    red: '빨간색',
    orange: '주황색',
    yellow: '노랑색',
};

console.log(dictionary);
console.log(dictionary['red']);
console.log(dictionary['orange']);
console.log(dictionary['yellow']);

console.log(typeof dictionary);
console.log(typeof dictionary['red']);


/**
 * Array 타입
 * 
 * 값을 리스트로 나열할 수 있는 타입이다.
 */

const iveMembersArray = [
    '안유진',
    '가을',
    '레이',
    '장원영',
    '리즈',
    '이서',
];
console.log(iveMembersArray);
console.log(typeof iveMembersArray);

/**
 * index
 * 
 * 0부터 시작한다.
 * 1씩 올라간다.
 */
console.log(iveMembersArray[0]);
console.log(iveMembersArray[5]);

iveMembersArray[0] = '코드팩토리';
console.log(iveMembersArray);
console.log(typeof iveMembersArray);


/**
 * static typing -> 변수를 선언할 때 어떤 타입의 변수를 선언할 지 명시를 한다.
 *                  C언어
 * dynamic typeing -> 변수의 타입을 명시적으로 선언하지 않고 값에의해 타입을 "추론"한다.
 *                    JS
 * 
 * JS는 dynamic typing 이다.
 */

