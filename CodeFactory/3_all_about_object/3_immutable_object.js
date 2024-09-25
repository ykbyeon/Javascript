/**
 * Immutable Object
 */
const yuJin = {
    name: '안유진',
    year: 2003,

    get age() {
        return new Date().getFullYear - this.year;
    },

    set age(age) {
        this.year = new Date().getFullYear - age;
    },
}

console.log(yuJin);

/**
 * Extensible
 * 
 * 확장 가능여부를 설정할 수 있다.
 */
console.log(Object.isExtensible(yuJin));

yuJin['position'] = 'vocal';

console.log(yuJin);

Object.preventExtensions(yuJin);
console.log(Object.isExtensible(yuJin));

yuJin['groupName']='아이브';    // 주의!!! extensible이 false여도, property추가시 에러가 발생되지는 않는다.
                                // 그러나 실제로 Property가 추가되지 않는다!! (에러가 안나므로, 주의할 것!!)
console.log(yuJin);


delete yuJin['position']; // extensible이 false여도, property 삭제는 가능하다. (말그대로 확장만 안되는 것)
console.log(yuJin);

/**
 * Seal
 * 
 * 봉인한다....
 */

const yuJin2 = {
    name: '안유진',
    year: 2003,

    get age() {
        return new Date().getFullYear - this.year;
    },

    set age(age) {
        this.year = new Date().getFullYear - age;
    },
}

console.log(yuJin2);
console.log(Object.isSealed(yuJin2));

Object.seal(yuJin2);
console.log(Object.isSealed(yuJin2));

yuJin2['groupName'] = '아이브';
console.log(yuJin2); // seal 되어 있어서, 프로퍼티 추가가 되지 않는다. (주의!!!. 에러도 발생하지 않는다.)

delete yuJin2['name'];
console.log(yuJin2); // seal 되어 있어서, 프로퍼티 삭제가 되지 않는다. (주의!!!. 에러도 발생하지 않는다.)

Object.defineProperty(yuJin2, 'name',{
    value: '코드팩토리',
});
console.log(Object.getOwnPropertyDescriptor(yuJin2, 'name'));

Object.defineProperty(yuJin2, 'name',{
    writable: false,
});
console.log(Object.getOwnPropertyDescriptor(yuJin2, 'name'));
//결과
// {
//     value: '코드팩토리',
//     writable: false,
//     enumerable: true,
//     configurable: false
//   }


// Object.defineProperty(yuJin2, 'name',{
//     writable: true,
// });

// seal 하는 것은 configurable를 false로 하는 것과 같다. 추가로 프로퍼티 추가/삭제 불가.



/**
 * Freezed
 * 
 * 동결시키다.
 * 가장 높은 immutable 프로그래밍의 등급이다.
 * 
 * 읽기외에 모든 기능을 불가능하게 만든다!!!
 * 
 */
const yuJin3 = {
    name: '안유진',
    year: 2003,

    get age() {
        return new Date().getFullYear - this.year;
    },

    set age(age) {
        this.year = new Date().getFullYear - age;
    },
}

console.log(Object.isFrozen(yuJin3));

Object.freeze(yuJin3);
console.log(Object.isFrozen(yuJin3));

yuJin3['groupName'] = '아이브';
console.log(yuJin3); // freeze 되어 있어서, 프로퍼티 추가가 되지 않는다. (주의!!!. 에러도 발생하지 않는다.)

delete yuJin3['name'];
console.log(yuJin3); // freeze 되어 있어서, 프로퍼티 삭제가 되지 않는다. (주의!!!. 에러도 발생하지 않는다.)

// Object.defineProperty(yuJin3, 'name',{
//     value: '코드팩토리',
// })
//freeze 되어 있어서, 프로퍼티 수정도 되지 않는다. (이 경우 에러는 발생함. - TypeError: Cannot redefine property)

console.log(Object.getOwnPropertyDescriptor(yuJin3,'name'));

const yuJin4 = {
    name: '안유진',
    year: 2003,

    // Object안에 Object를 nesting할 수 있다.
    wonYoung: {
        name: '장원영',
        year: 2002,
    },
}
Object.freeze(yuJin4);
console.log(Object.isFrozen(yuJin4));           // true
console.log(Object.isFrozen(yuJin4.wonYoung));  // false.  중요!!!! 상위Object를 Freeze 했다고 하위Object까지 Freeze 되는 것은 아님!!!

// 중요!!! Extensible, Seal 모두 마찬가지로 상위Object를 Extensible, Seal 했다고 하위Object까지 Extensible, Seal 되는 것은 아님!!!

// 하위 오브젝트까지 Extensible, Seal, Freeze를 변경하고 싶을경우,
// 재귀함수 등을 사용해서 내부에 있는 오브젝트들도 모두 각각 변경을 해줘야 한다.