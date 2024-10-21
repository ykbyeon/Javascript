/**
 * Closures
 * 
 * Lexical Environment
 * 
*/

function fn01(name, age) {
    this.name = name;
    this.age = age;
};

fn01.prototype.getDesc = function () {
    return `FN01 :: ${this.name} , ${this.age}`;
}

function fn02(n, a) {
    let name = n;
    let age = a;
    const getDesc = () => {
        return `name : ${name}, age : ${age}`;
    };
    //eturn Object.freeze({
    return ({
        getDesc
    });
};
//return시에 Object.freeze()를 호출했는데,
//왜 ()안의 범위를 벗어나 fn02까지 freeze가 되는지?
//아래 확인 시 fn02까지 freeze되는 것은 아님.
//return받은 객체 자체가 freeze되어, 그것에 대한 변경이 안되는 것.ㄴ

console.log("=======================");
//Object.freeze(fn02);
console.log("fn02 frozen:" + Object.isFrozen(fn02));
console.log("=======================");


function getDesc() {
    return "aaaa";
}

const a = new fn01('a', 17);
const b = new fn01("bbbb", 88);

const c = fn02("변경불가", 99);
const d = fn02("변경불가 그렇지만 .... ", 9);

c.name = "변경시도";

console.log("=======================");
console.log("c frozen:" + Object.isFrozen(c));
console.log("d frozen:" + Object.isFrozen(d));
console.log("=======================");

console.log(`A : ${a.getDesc()}, B : ${b.getDesc()} , C : ${c.getDesc()}, D : ${d.getDesc()}}`);



console.log("=======================");

const fnO = ((n, a) => {
    let name = n;
    let age = a;
    const getDesc = () => {
        return `name : ${name}, age : ${age}`;
    };
    const setName = (n) => {
        name = n;
    };
    return {
        getDesc, setName
    };
})('이름', 10);

console.log("=======================");
console.log(c, c.getDesc(), d.getDesc(), fnO.getDesc());


console.log("=======================");
fnO.setName("변경했어요 ...... ");
console.log(fnO.getDesc());

