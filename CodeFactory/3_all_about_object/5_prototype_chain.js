/**
 * Prototype
 */

const testObj = {};

// __proto__는 모든 객체에 존재하는 프로퍼티다.
// class 강의에서 배울 때 상속에서 부모 클래스에 해당되는 값이다.
console.log(testObj.__proto__);

function IdolModel(name, year) {
    this.name = name;
    this.year = year;
};

console.log(IdolModel.prototype); // 아무런 값도 없는 것 처럼 보임. (값이 감춰져 있어 그런 것)
console.dir(IdolModel.prototype, { // 숨겨진 항목도 보여주는 옵션
    showHidden: true,
});
// 수행결과
// <ref *1> {
//   [constructor]: [Function: IdolModel] {
//     [length]: 2,
//     [name]: 'IdolModel',
//     [arguments]: null,
//     [caller]: null,
//     [prototype]: [Circular *1]
//   }
// }

console.log(IdolModel.prototype.constructor);

// circular reference 
// 서로가 서로를 참조하고 있는 상태임
console.log(IdolModel.prototype.constructor === IdolModel);
console.log(IdolModel.prototype.constructor.prototype === IdolModel.prototype);

const yuJin = new IdolModel('안유진', 2003);
console.log(yuJin.__proto__);
console.log(yuJin.__proto__ === IdolModel.prototype);

console.log(testObj.__proto__ === Object.prototype);

console.log(IdolModel.__proto__ === Function.prototype);
console.log(Function.prototype.__proto__ === Object.prototype);
console.log(IdolModel.prototype.__proto__ === Object.prototype);

console.log(yuJin.toString());
console.log(Object.prototype.toString());


// Prototype chain이 어떠한 경우 유용한지 알아보자
function IdolModel2(name, year) {
    this.name = name;
    this.year = year;

    this.sayHello = function () {
        return `${this.name}이 인사를 합니다.`;
    }
}

const yuJin2 = new IdolModel2('안유진', 2003);
const wonYoung2 = new IdolModel2('장원영', 2002);

console.log(yuJin2.sayHello());
console.log(wonYoung2.sayHello());
console.log(yuJin2.sayHello == wonYoung2.sayHello); //false
// 같은 기능의 sayHello함수 이지만, 각각의 객체별로 고유한 함수가 생성된 것(메모리에 별도 공간에 생성)
// name, year와 같이 객체의 고유한 값이 아닌, 동일한 기능을 하는 sayHello가 별도로 생성되는 것은 메모리 낭비(중복)임
// 이럴 때 어떻게 해결???

console.log(yuJin2.hasOwnProperty('sayHello')); //상속받은 프로퍼티(false)인지, 고유프로퍼티(true)인지 확인하는 함수
// 효율을 위해 sayHello가 각 개체의 고유한 프로퍼티가 아닌, 뭔가 한개가 공유되었으면 좋겠는데....
// 어떻게 하지?

function IdolModel3(name, year) {
    this.name = name;
    this.year = year;
}

IdolModel3.prototype['sayHello'] = function () {
    return `${this.name}이 인사를 합니다.`; //this를 사용해도 된다. this.name은 향후 상속받은 child의 프로퍼티 name을 가르키게 됨.
}

const yuJin3 = new IdolModel3('안유진', 2003);
const wonYoung3 = new IdolModel3('장원영', 2004);

console.log(yuJin3.sayHello());
console.log(wonYoung3.sayHello());

console.log(yuJin3.sayHello === wonYoung3.sayHello);

console.log(yuJin3.hasOwnProperty('sayHello'));

IdolModel3.sayStaticHello = function () {
    return `안녕하세요 저는 static method입니다.`;
}
//console.log(IdolModel3);
console.log(IdolModel3.sayStaticHello());


/**
 * Overriding
 */
console.log('----------------');
function IdolModel4(name, year) {
    this.name = name;
    this.year = year;

    this.sayHello = function () {
        return `안녕하세요. 저는 인스턴스 메서드 입니다!`
    }
}

IdolModel4.prototype.sayHello = function () {
    return `안녕하세요. 저는 prototype 메서드 입니다!`;
}


const yuJin4 = new IdolModel4('안유진', 2003);

// 프로퍼티 셰도윙 - class에서 override와 똑같은 기능
console.log(yuJin4.sayHello());


/**
 * 지금부터는 일반적인 OOP에는 존재하지 않는 문법에 대한 설명임
 * 
 * JS OOP는 전통적인 OOP룰을 따르지 않는 것이 많음.
 * JS에서는 prototype값이나 __proto__값을 변경할 수 있음.
 * 이 뜻은 우리가 상속받는 부모Class를 변경할 수 있다는 뜻임.
 * 언제 할 수있느냐? 인스턴스를 생성하고 난 다음에도 할 수가 있다.
 * (기존개발자들이 들으면 "말이되냐?"고 반문할 사항....)
 * 
 * 일반적으로 많이 사용하지는 않으나, 이러한 것이 가능하다...
 * 
 * 
 * 
 * 1) getPrototypeOf, setPrototypeOf
 * 
 * 2) 인스턴스의 __proto__ 변경 vs 함수의 prototype 변경
 */

console.log('----------------');

function IdolModel(name, year) {
    this.name = name;
    this.year = year;
}

IdolModel.prototype.sayHello = function () {
    return `${this.name} 인사를 합니다.`;
}

function FemaleIdolModel(name, year) {
    this.name = name;
    this.year = year;

    this.dance = function () {
        return `${this.name}가 춤을 춥니다.`;
    }
}

const gaEul = new IdolModel('가을', 2004);
const ray = new FemaleIdolModel('레이', 2004);

console.log(gaEul.__proto__);
console.log(gaEul.__proto__ === IdolModel.prototype);
console.log(Object.getPrototypeOf(gaEul) === IdolModel.prototype);
// 즉, getPrototypeOF(AAAA) 는 AAAA의 __proto__를 가져오게 된다.


console.log(gaEul.sayHello());
console.log(ray.dance());
//console.log(ray.sayHello()); -> 에러발생!!
console.log(Object.getPrototypeOf(ray) === FemaleIdolModel.prototype);

Object.setPrototypeOf(ray, IdolModel.prototype); // 이미 생성된 객체의 __proto__를 변경하였다....
console.log(ray.sayHello());
console.log(ray.dance()); // !!!!!!

//모든 prototype들은 constructor를 갖고 있다.
//이 constructor들은 함수를 가리키는 circular reference가 된다.
console.log(ray.constructor === FemaleIdolModel);
console.log(ray.constructor === IdolModel);
console.log(gaEul.constructor === IdolModel);
console.log(Object.getPrototypeOf(ray) === FemaleIdolModel.prototype);
console.log(Object.getPrototypeOf(ray) === IdolModel.prototype);
console.log(FemaleIdolModel.prototype === IdolModel.prototype);


FemaleIdolModel.prototype = IdolModel.prototype;

const eSeo = new FemaleIdolModel('이서', 2007);
console.log(Object.getPrototypeOf(eSeo) === FemaleIdolModel.prototype);
console.log(Object.getPrototypeOf(eSeo) === IdolModel.prototype);
console.log(FemaleIdolModel.prototype === IdolModel.prototype);

// 함수를 이용해서 할 수 있는 것들이 굉장히 많은데,
// 왜 class 키워드를 먼저 배웠을까?
// class를 이용해서 OOP를 구현하는게 업계의 표준이기 때문임.
// 나중에 나온 class는 이런 것들을 지원하지 않을까?
// class 키워드만 알고, 생성자 함수를 통한 위의 부분들은 몰라도 될까?
// -> 그렇지 않음. javascript라는 언어가 굉장히 오래 되었고,
//    그러다 보니 오래된 framework들이 많음. 이런 오래전 framework들은
//    이렇게 함수형으로 작성되어 있는 프로젝트들이 훨씬더 많음.
//    고전적으로 이런식으로 작성하는 것을 좋아하는 JS개발자들이 굉장히 많음.
//    결국 두가지 구현 방법을 모두 잘 숙지하고 있어야 함.
