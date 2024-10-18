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
    return Object.freeze({
        getDesc
    });
};


function getDesc() {
    return "aaaa";
}

const a = new fn01('a', 17);
const b = new fn01("bbbb", 88);

const c = fn02("변경불가", 99);
const d = fn02("변경불가 그렇지만 .... ", 9);

console.log(`A : ${a.getDesc()}, B : ${b.getDesc()} , C : ${c.getDesc()}, D : ${d.getDesc()}}`);


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


console.log(c, c.getDesc(), d.getDesc(), fnO.getDesc());

fnO.setName("변경했어요 ...... ");
console.log(fnO.getDesc());

