/**
 * Closure
 * 
 * A closure is the combination of a function and the lexical
 * environment within which that function was declared.
 * 
 * "클로저는 어떤 함수와 해당 함수가 선언된 렉시컬 환경의 조합이다."
 * 
 * "상위 함수보다 하위 함수가 더 오래 살아있는 경우를 closure라고 한다."
 */

function getNumber() {
    var number = 5;

    function innerGetNumber() {
        return number;
    }

    return innerGetNumber();
}

// console.log(number);

//console.log(getNumber());

function getNumber() {
    var number = 5;

    function innerGetNumber() {
        return number;
    }

    return innerGetNumber;
}

const runner = getNumber();

console.log(runner);
console.log(runner());


/**
 * 이걸 도대체 어디에다 쓰는가???
 * 
 */

/**
 * 1) 데이터 캐싱
 */

// 일부분의 계산 부하가 매우 클 때 (해당부분을 한 번만 계산하고 Closure에 캐싱하는 효과)
function cacheFunction(newNumb) {
    var number = 10 * 10; // 이 부분 계산이 매우 오래 걸린다는 가정을 했을 때.. ex) 이 연산이 2시간 소요됨

    function innerCacheFunction(newNumb) {
        return number * newNumb;
    }

    return innerCacheFunction;
}

const runner2 = cacheFunction();    // number = 10 * 10; 연산은 여기서 1회만 수행됨. 그 결과를 Closure가 기억함.
console.log(runner2(10));   // number는 위 cacheFunction() 호출 시 계산되어 Closure내에 저장된 값 사용
console.log(runner2(20));   // number는 위 cacheFunction() 호출 시 계산되어 Closure내에 저장된 값 사용



// 반복적으로 특정값을 변환해야할 때
function cacheFunction2() {
    var number = 99;

    function increment() {
        number++;
        return number;
    }

    return increment;
}

const runner3 = cacheFunction2();
console.log(runner3());
console.log(runner3());
console.log(runner3());
console.log(runner3());
console.log(runner3());
console.log(runner3());
console.log(runner3());
console.log(runner3());
console.log(runner3());
console.log(runner3());
console.log(runner3());




/**
 * 3) 정보 은닉
 * 
 * 굉장히 유용하게 쓰일 수 있는 기능임
 * 
 * JS에서는 private 변수 개념이 생긴지 얼마 되지 않았음. ( #으로 선언... )
 * 예전에는 그런 것을 어떻게 구현했을까?
 */
function Idol(name, year) {
    this.name = name;

    var _year = year;   // this 키워드로 선언을 안했기 때문에, 객체를 생성을 할 때 Idol함수로 생성한 객체는 _year값에 접근할 수 없음.

    this.sayNameAndYear = function () {
        return `안녕하세요. 저는 ${name}입니다. ${_year}에 태어났습니다.`;
    }
}

const yuJin = new Idol('안유진', 2003);
console.log(yuJin.sayNameAndYear());

console.log(yuJin.name);
console.log(yuJin._year);