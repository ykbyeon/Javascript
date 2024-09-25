/**
 * Using function to create objects
 */
function IdolModel(name, year) {
    //console.log(new.target);
    if (!new.target) {        //new 키워드를 쓰지않고 생성자 함수를 호출해도, 강제로 new키워드 사용한 생성자 함수가 호출되도록 한다.
        return new IdolModel(name, year);
    }

    this.name = name;
    this.year = year;

    //method 추가방법
    this.dance = function () {
        return `${this.name}이 춤을 춥니다.`;
    }
}

const yuJin = new IdolModel('안유진', 2003);
console.log(yuJin);
// console.log(yuJin.dance());

const yuJin2 = IdolModel('안유진', 2003);
console.log(yuJin2);
// console.log(global.name);   //global은 JS가 수행될 때 자동생성되는 전역 Object
// new 키워드를 사용하지 않고 생성자 함수를 call하면, 그 때 생성자 함수의 property는 global 오브젝트에 가서 붙게 된다.
// => 이런게 된다고 이렇게 하라는게 아니라, 절대 이렇게 사용하지 말라는 것!!!!!

const yuJin3 = IdolModel('코드팩토리', 2024);
// console.log(yuJin3);
// console.log(global.name); 



const IdolModelArrow = (name, year) => {
    this.name = name;
    this.year = year;
}

const yuJin4 = new IdolModelArrow('안유진', 2003);
//실행결과 : TypeError: IdolModelArrow is not a constructor
//Arrow함수는 생성자 함수로 사용할 수 없다.!!!