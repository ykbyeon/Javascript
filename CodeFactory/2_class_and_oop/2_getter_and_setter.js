/**
 * Getter and Setter
 */
class IdolModel {
    name;
    year;

    constructor(name, year) {
        this.name = name;
        this.year = year;
    }

    /**
     * Getter
     * 무조건 무언가를 반환해 줘야 한다.
     * 정의는 함수처럼 하지만, 사용할 때는 그냥 Property처럼 호출함
     * 
     * 1) 데이터를 가공해서 새로운 데이터를 반환할 때
     * 2) private한 값을 반환할 때
     */

    get nameAndYear() {
        return `${this.name}-${this.year}`;
    };

    /**
     * Setter
     * 값을 저장할 때 사용. Getter의 반대 개념.
     * 보통 Property와 동일한 이름의 Setter를 지정한다.
     */
    set setName(name) { //property와 동일한 이름 사용. 반드시 하나의 parameter가 필수로 있어야 함.
        this.name = name;
    };

}

const yuJin = new IdolModel('안유진', 2003);
console.log(yuJin);
console.log(yuJin.nameAndYear); //정의는 함수처럼 하지만, 사용할 때는 그냥 Property처럼 호출함. yuJin.nameAndYear() 하면 에러 발생함.

yuJin.setName = '장원영';
console.log(yuJin);
// Setter가 꼭 필요한가? 위 class정의에서 setter를 삭제해도, 어차피 name은 위코드로 변경되는데...라고 지금은 생각할 수 있다.
// 실제로 위에서 class정의 내에 setter 부분 주석처리 해도, 코드는 정상 수행됨.
// 나중에 배울 텐데, class의 Property를 private로 만들게 되면, 해당 Property를 직접 적근이 불가능하다.
// 반드시 Setter를 통해서만 접근이 가능함.

// 실무적으로 setter는 잘 사용되지 않는다. (많이 선호하는 형태는 아님)
// immutable programming을 많이 하기 때문임...


/**
 * Setter와 Getter가 빛나는 상황 예제
 */
class IdolModel2 {
    #name;  //private property
    year;

    constructor(name, year) {
        this.#name = name;  // ES7 엔진에서만 지원함.
        this.year = year;
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }
}

const yuJin2 = new IdolModel2('안유진', 2003);
console.log(yuJin2);    // year값만 출력됨. name은 private라 숨겨짐.
console.log(yuJin2.name);   // getter를 통해서 접근 가능.

yuJin2.name = '코드팩토리';
console.log(yuJin2.name);
// 현대의 immutable programming에서는 setter는 사용하지 않는 것을 권장함.
// getter는 새로운 속성을 마치 이미 존재했던 것 같은 속성인 것 처럼 사용할 때 가끔 쓰이는 경우가 있음.

