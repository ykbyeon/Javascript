/**
 * All about objects
 * 
 * 객체를 선언할 때 사용할 수 있는 방법들
 * 
 * 1) object를 생성해서 객체 생성 - 기본기 {}
 * 2) class를 인스턴스화 해서 생성 - class와 OOP
 * 3) function을 사용해서 객체 생성
 * 
 */

// 1)
const yuJin = {
    name: '안유진',
    year: 2003,
};
console.log(yuJin);



// 2)
class IdolModel {
    name;
    year;

    constructor(name, year) {
        this.name = name;
        this.year = year;
    }
}

console.log(new IdolModel('안유진', 2003));



// 3)
// 생성자 함수
function IdolFunction(name, year) {
    this.name = name;
    this.year = year;
}

const gaEul = new IdolFunction('가을', 2002);   // function내에서 this 키워드로 Property를 정의한 경우에만, 함수에 new 키워드를 사용해서 객체를 생성할 수 있다.
console.log(gaEul);
