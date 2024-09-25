/**
 * Object / 객체
 * 
 * JS에서 가장 중요한 데이터 타입임.
 * 웬만한 것들은 모두 객체를 사용해서, 데이터 구조를 이루게 된다.
 * Object를 어떻게 다루는가에 따라 JS의 숙련도가 완전히 달라지게 된다.
 * 
 * 이번에는 Object를 다루는 것에 대한 추가 기본지식에 대해 설명한다.
 */

// key : value pair
let yuJin = {
    name: '안유진',
    group: '아이브',
    dance: function () {
        return `${this.name}이 춤을 춥니다.`;
    }
};

console.log(yuJin);
console.log(yuJin.name);
console.log(yuJin['name']);

const key = 'name';
console.log(yuJin[key]);

console.log(yuJin.dance());


const nameKey = 'name';
const nameValue = '안유진';

const groupKey = 'group';
const groupValue = '아이브';

const yuJin2 = {
    [nameKey]: nameValue,
    [groupKey]: groupValue,
    dance: function () {
        return `${this.name}이 춤을 춥니다.`;
    }
};

console.log(yuJin2);
console.log(yuJin2.dance());

yuJin2['group'] = '코드팩토리';
console.log(yuJin2);


// 신규 Property 추가
yuJin2['englishName'] = 'An Yu Jin';
console.log(yuJin2);

delete yuJin2['englishName']; // Property삭제
console.log(yuJin2);
// 지금까지 실습 중 이상한점?????
// const 키워드를 쓰면 해당 변수는 변경할 수 없다고 했는데,
// const로 선언한 yuJin2라는 Object는 property의 변경, 추가, 삭제가 된다!!!!!
// 이 부분은 다음 시간에 Copy by Value, Copy by Reference에 대해 배울 때 자세히 설명하겠음.
// 일단 아래에 간단히만 설명하고 넘어가겠음.
/**
 * const로 선언한 객체의 특징
 * 
 * 1) const로 선언할 경우 객체 자체를 변경할 수는 없다.
 * 2) 객체안의 Property나 Method는 변경할 수 있다.
 */
const wonYoung = {
    name: '장원영',
    group: '아이브',
}
console.log(wonYoung);

// wonYoung = {}; // "Assignment to constant variable." 에러발생. 이미 한번 초기화가 되고 나면, 값을 바꿀 수 없다.
wonYoung['group'] = '코드팩토리';
console.log(wonYoung);


console.log('----------------------');

/**
 * 모든 키값 다 가져오기
 */
console.log(Object.keys(wonYoung));

/**
 * 모든 벨류값 다 가져오기
 */
console.log(Object.values(wonYoung));


const name = '안유진';

const yuJin3 = {
    //name: name
    name,
};
console.log(yuJin3);


