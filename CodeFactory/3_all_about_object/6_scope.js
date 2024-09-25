/**
 * Scope
 */

var numberOne = 20;

function levelOne() {
    console.log(numberOne);
}

//levelOne();
// 함수를 선언하면, 상위 변수가 존재하는 스코프를 포함한다.

function levelOne() {
    var numberOne = 40;
    console.log(numberOne);
}

levelOne();
// 가장 가까운 곳에 있는 스코프의 변수를 가져온다.

console.log(numberOne);
// 함수안에서 선언한 변수는 상위 스코프의 변수를 덮어쓰지 않는다.

console.log('------------------------');
function levelOne() {
    var numberOne = 40;

    function levelTwo() {
        var numberTwo = 99;

        console.log(`levelTwo numberTwo : ${numberTwo}`);
        console.log(`levelTwo numberOne : ${numberOne}`);
    }

    levelTwo();
    console.log(`levelOne numberOne : ${numberOne}`);
}

levelOne();
// 모든 변수는 가장 가까운 스코프에 있는 선언부터 활용한다.

console.log(numberOne);
//console.log(numberTwo);


/**
 * 중요한 개념!!!!
 * 인터뷰시 자주 질문하는 유형임!!!
 * 
 * JS -> Lexical Scope라고 한다. 이것이 무엇인가?
 * 선언된 위치가 상위 스코프를 정한다.
 * 
 * 
 *  cf) 반대개념 Dynamic Scope : 실행한 위치가 상위 스코프를 정한다.
 */
var numberThree = 3;

function functionOne() {
    var numberThree = 100;

    functionTwo();
}

function functionTwo() {
    console.log(numberThree);
}

functionOne();  // 3 <- functionTwo가 functionOne안에서 호출되었지만, functionTwo의 선언은 global scope에서 되었다.
functionTwo();  // 3


var i = 999;

for (var i = 0; i < 10; i++) {
    console.log(i);
}
console.log(`i in golbal scope : ${i}`);
// var 키워드를 썼을 때 scope가 새로 생기는 경우는 function을 선언했을 때이다.
// for, while, if 같은 경우는 var 키워드를 썼을 때 새로운 scope를 생성하지 않는다. 바로 global이 되어버린다.


i = 999;
for (let i = 0; i < 10; i++) {
    console.log(i);
}
console.log(`i in golbal scope : ${i}`);
// let,const 키워드를 썼을 때, block level scope도(for, while, if 같은) 만들어 낼 수가 있다.


/**
 * var 키워드는 함수 레벨 스코프만 만들어 낸다.
 * 
 * let, const 키워드는 함수 레벨 스코프와 블록 레벨 스코프도 만들어 낸다.
 * 
 * => var는 잊어라. 그냥 let, const만 사용하자!!!
 */