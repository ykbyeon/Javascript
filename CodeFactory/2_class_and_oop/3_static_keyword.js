/**
 * Static Keyword
 * 
 * 지금까지 정의했던 모든 Property들은 인스턴스(객체)에 직접적으로 귀속이 되었다.
 * 그런데 Static을 사용하면, 그것들이 Class에 귀속되도록 할 수 있다.
 */
class IdolModel {
    name;
    year;
    static groupName = '아이브';

    constructor(name, year) {
        this.name = name;
        this.year = year;
    }

    static returnGroupName() {
        return '아이브';
    }
};

const yuJin = new IdolModel('안유진', 2003);
console.log(yuJin);

console.log(IdolModel.groupName);
console.log(IdolModel.returnGroupName());



// static이 어디에 유용한 것인지???
/**
 * factory constructor
 * 
 * 현대에 굉장히 많이 쓰이는 개념임.
 * 이 패턴을 잘 기억해 뒀다가, 향후 OOP할 때 활용할 것
 */

class IdolModel2 {
    name;
    year;

    constructor(name, year) {
        this.name = name;
        this.year = year;
    }

    //factory constructor 만들기
    static fromObject(object) {   //Object로 부터 이 Class의 인스턴스를 만들겠다라는 약속같은 명명법임
        return new IdolModel2(
            object.name,
            object.year,
        );
    }

    static fromList(list) {
        return new IdolModel2(
            list[0],
            list[1],
        );
    }
};


// new 키워드 없이 객체 생성됨. (factory constructor 사용)
const yuJin2 = IdolModel2.fromObject({
    name: '안유진',
    year: 2003,
});
console.log(yuJin2);

const wonYoung2 = IdolModel2.fromList([
    '장원영',
    2004,
]);
console.log(wonYoung2);
