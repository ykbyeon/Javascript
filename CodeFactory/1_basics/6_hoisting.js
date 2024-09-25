/**
 * Hoisting
 */
console.log('Hello');
console.log('World');
console.log('-------------');

// console.log(name);
// var name = '코드팩토리';
// console.log(name);


/**
 * Hoisting은 무엇인가?
 * 
 * 모든 변수 선언문이 코드의 최상단으로 이동되는 것처럼 느껴지는 현상을 이야기한다.
 * (실제로 코드가 이동되는 것은 아니다. 현상적으로 그렇게 보인다는 것임)
 * 현 단계에서는 이정도로만 이해하고 넘어가자! 더 정확한 의미/동작방식은 추후에 학습
 */

// var name;
// console.log(name);
// name = '코드팩토리';
// console.log(name);

//let, const도 hoisting이 되는가??? 된다. (인터뷰에서 자주 나오는 질문임)

console.log(yuJin);
//let yuJin = '안유진';

//var키워드는 hoisting을 방지하지 못하나, let/const는 hoisting이 발생했을 때 초기화전 접근하지 못하도록 막아준다.
//이제 var는 사용하지 말고, let/const만을 사용해야 하는 이유