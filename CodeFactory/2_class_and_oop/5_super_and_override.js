/**
 * Super and Override
 * 
 * 부모 class를 parents 또는 super 라고 부른다.
 */

class IdolModel {
    name;
    year;

    constructor(name, year) {
        this.name = name;
        this.year = year;
    }

    sayHello() {
        return `안녕하세요. ${this.name}입니다.`;
    }
}


class FemaleIdolModel extends IdolModel {
    // 노래, 춤 등등
    part;

    // 기존 생성자 Overriding
    constructor(name, year, part) {
        // this.name = name;
        // this.year = year;
        super(name, year);
        this.part = part;
    }

    // 함수 Overriding
    sayHello() {
        //return `안녕하세요. ${super.name}입니다. ${this.part}를 맡고있습니다.`;
        //전통적인 대다수의 OOP언어에서는 위의 주석처리한 문법이 맞다. 
        //다른 OOP언어에서는 부모의 Property를 접근하기 위해서는 "super.부모property명" 을 해주면 되는데,
        //JS에서는 "this.부모property명" 으로 접근해야 한다.
        //생성자(constructor)외에 일반 function에서는 super를 사용하지 않는다.  <---------- !!!주의해서 기억해두자 !!!

        //return `안녕하세요. ${this.name}입니다. ${this.part}를 맡고있습니다.`;

        //반복 문구 없애기. "안녕하세요. ${this.name}입니다." 가 부모/자식에서 반복됨
        //부모의 함수를 접근할 때는 super 키워드를 사용함.
        return `${super.sayHello()} ${this.part}를 맡고있습니다.`
    }
}

const yuJin = new FemaleIdolModel('안유진', 2003, '보컬');
console.log(yuJin);

const wonYoung = new IdolModel('장원영', 2004);
console.log(wonYoung);
console.log(wonYoung.sayHello());
console.log(yuJin.sayHello());