/**
 * this
 * 
 * 강력한 OOP가 탑재된 언어에 익숙한 개발자는, this가 배울게 뭐가 있지? 라고 생각할 수 있으나...
 * JS의 OOP는 조금 다른 개념이 있기 때문에,
 * this가 가리키는 요소가 매번 바뀐다! (어떤 조건에 따라 바뀔때가 있다)
 * 또, this 키워드를 조작하는 방법이 있기 때문에, this 키워드를 배워야 한다.
 * 
 * !!! (매우중요) JS는 Lexical Scope를 사용하기 때문에 함수의 상위 스코프가 정의 시점에 평가된다.
 *                하지만, this키워드는 바인딩이 객체가 생성되는 시점에 결정(★★★★★) 된다.!!!
 */

const testFunction = function () {
    return this;
}

console.log(testFunction());
console.log(testFunction() === global);

const yuJin = {
    name: '안유진',
    year: 2003,
    sayHello: function () {
        return `안녕하세요 저는 ${this.name}입니다.`;
    },
}

console.log(yuJin.sayHello());

function Person(name, year) {
    this.name = name;
    this.year = year;

    this.sayHello = function () {
        return `안녕하세요 저는 ${this.name}입니다.`;
    }
}

const yuJin2 = new Person('안유진', 2003);
console.log(yuJin2.sayHello());

Person.prototype.dance = function () {
    function dance2() {
        return `${this.name}이 춤을 춥니다.`;
    }

    return dance2();
}

console.log(yuJin2.dance());

/**
 * this 키워드가 어떤걸 가르키냐는 세가지만 기억하면 된다.
 * 
 * 1) 일반 함수 호출할 땐 this가 최상위 객체(global 또는 window)를 가리킨다.
 * 2) 메서드로 호출할 땐 호출된 객체를 가리킨다.
 * 3) new 키워드를 사용해서 객체를 생성했을 땐 객체를 가리킨다.
 */


/**
 * 우리가 예상하는 or 원하는 this값으로 this를 매핑하는 방법
 * 
 * 1) apply()
 * 2) call()
 * 3) bind()
 */

function returnName() {
    return this.name;   //일반함수에서 this호출. global에 매핑됨.
}
console.log(returnName());

const yuJin3 = {
    name: '안유진',
}

console.log(returnName.call(yuJin3));   // returnName을 yuJin3에 바인딩해서 함수 실행하겠다는 뜻임
console.log(returnName.apply(yuJin3));  // returnName을 yuJin3에 바인딩해서 함수 실행하겠다는 뜻임
//왜 같은 기능이 두개??

/**
 * 1) call -> 컴마를 기반으로 아규먼트를 순서대로 넘겨준다.
 * 2) apply -> 아규먼트를 리스트로 입력해야 한다.
 */
function multiply(x, y, z) {
    return `${this.name} / 결과값 : ${x * y * z}`;
}

console.log(multiply.call(yuJin3, 3, 4, 5));
console.log(multiply.apply(yuJin3, [3, 4, 5]));

/**
 * bind()
 */
const laterFunc = multiply.bind(yuJin3, 3, 4, 5);
console.log(laterFunc);
console.log(laterFunc());