/**
 * Class Keyword
 * 
 * - 이론은 keynote로 추가 설명
 * 
 * - Class정의
 *      1. 클래스는 객체지향 프로그래밍에서 특정 객체(인스턴스)를 생성하기 위한
 *         변수와 메소드(함수)를 정의하는 일종의 틀이다.
 *      2. 정보를 일반화해서 정리하는 방법이다!
 *  
 * - 객체(Instance)
 *      1. Class(틀)에 맞춰서 실제로 구현한 각각의 데이터
 * 
 * 예) Class 아이돌 -> 이름, 출생연도
 *     Instance#1 -> 이름:안유진, 출생연도:2003
 *     Instance#2 -> 이름:장원영, 출생연도:2004
 *     .....
 *     cf) Class가 빵틀이라면, Instance는 빵틀로 찍어낸 개별 빵들....
 *
 *  - 인스턴스화(Instanciation) : Class를 객체(Instance)로 만드는 과정
 */

// class IdolModel {
//     name = '안유진';
//     year = 2003;
// };

class IdolModel {
    //Property
    name;
    year;

    //생성자
    constructor(name, year) {
        this.name = name; //this 현재 자기 자신 인스턴스를 가리킴
        this.year = year;
    }
};

// constructor - 생성자

const yuJin = new IdolModel('안유진', 2003);
console.log(yuJin);
const gaeul = new IdolModel('가을', 2002);
console.log(gaeul);
const ray = new IdolModel('레이', 2004);
console.log(ray);
const wonYoung = new IdolModel('장원영', 2004);
console.log(wonYoung);
const liz = new IdolModel('리즈', 2004);
console.log(liz);
const eseo = new IdolModel('이서', 2007);
console.log(eseo);

console.log(yuJin.name);
console.log(yuJin.year);

console.log('-------------------');

class IdolModel2 {
    // Property 정의를 안해도 생성자만 있으면, 생성자내에 사용된 Property는 자동 생성된다.
    // 이런 방법도 가능하다는 것이지 권장되는 방법은 아님.
    // 필요한 Property는 명시적으로 정의해 놓는 것이 가독성 측면에서 좋다.(가능하면 정의하는 방식으로 코딩하자!!!)
    //name;
    //year;

    //생성자
    constructor(name, year) {
        this.name = name; //this 현재 자기 자신 인스턴스를 가리킴
        this.year = year;
    }
}

const yuJin2 = new IdolModel2('안유진', 2003);
console.log(yuJin2);
const gaeul2 = new IdolModel2('가을', 2002);
console.log(gaeul2);
const ray2 = new IdolModel2('레이', 2004);
console.log(ray2);
const wonYoung2 = new IdolModel2('장원영', 2004);
console.log(wonYoung2);
const liz2 = new IdolModel2('리즈', 2004);
console.log(liz2);
const eseo2 = new IdolModel2('이서', 2007);
console.log(eseo2);

console.log(yuJin2.name);
console.log(yuJin2.year);


/**
 * Method
 */


console.log('----------------------------');


class IdolModel3 {
    //Property
    name;
    year;

    //생성자
    constructor(name, year) {
        this.name = name; //this 현재 자기 자신 인스턴스를 가리킴
        this.year = year;
    };

    //Method
    //외부에서 처럼 function이라는 키워드 필요없이, 바로 method명을 쓰면 된다.
    //함수라는 것은 암묵적으로 암시되는 것
    sayName() {
        //return `안녕하세요 저는 안유진 입니다.`;
        return `안녕하세요 저는 ${this.name} 입니다.`;
    };

};


const yuJin3 = new IdolModel3('안유진', 2003);
console.log(yuJin3);
const gaeul3 = new IdolModel3('가을', 2002);
console.log(gaeul3);
const ray3 = new IdolModel3('레이', 2004);
console.log(ray3);
const wonYoung3 = new IdolModel3('장원영', 2004);
console.log(wonYoung3);
const liz3 = new IdolModel3('리즈', 2004);
console.log(liz3);
const eseo3 = new IdolModel3('이서', 2007);
console.log(eseo3);

console.log(yuJin3.sayName());
console.log(gaeul3.sayName());
console.log(wonYoung3.sayName());

console.log(typeof IdolModel);  // Class는 type이 함수(function)로 인식됨.
                                // 과거 OOP개념이 없던 시절(class 키워드가 없던 시절), function으로 OOP구현했었다.
                                // Class가 function으로 인식되어도 문제가 없다... 
console.log(typeof yuJin);  // Object(객체)다!!!

