const m = new Map();

m.set('a', 'b'); // set(키, 값) 으로 Map에 속성 추가
m.set(3, 'c');  // 문자열이 아닌 값도 키로 사용 가능
const d = {};
m.set(d, 'e');   // 객체도 키로 사용 가능

m.get(d);       //get(키) 로 속성값 조회
console.log(m.get(d));  //e

m.size;         //size로 속성 갯수 조회
console.log(m.size);    //3


for (const [k, v] of m) {
    console.log(k, v);
};

m.forEach((v, k) => {   //forEach에서 value , key순으로 리턴받음에 주의!!!!
    console.log(k, v);  //결과는 위와 동일
});

m.has(d);   //has(키)로 속성 존재 여부를 확인합니다.
console.log(m.has(d))   //true

m.delete(d);    //delete(키)로 속성을 삭제
console.log(m.has(d))   //false
console.log(m.size);    //2
m.clear();  //clear로 속성 전부 제거
console.log(m.size);    //0


console.log("==========================");


const s = new Set();
s.add(false);   //add(요소)로 Set에 추가
s.add(1);
s.add('1');
s.add(1);   //중복이므로 무시됨
s.add(2);

console.log(s.size);    //중복제거되고 4

s.has(1);
console.log(s.has(1));  //true

for (const a of s) {
    console.log(a, typeof (a));
}

s.forEach((a) => {
    console.log(a, typeof (a));
});

s.delete(2);
console.log(s.size);
s.clear();
console.log(s.size);

console.log('==============================');

const arr = [1, 3, 2, 7, 2, 6, 3, 5];

const s2 = new Set(arr);
const result = Array.from(s2);
console.log(result);    //[ 1, 3, 2, 7, 6, 5 ]


