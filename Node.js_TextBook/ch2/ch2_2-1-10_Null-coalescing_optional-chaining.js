// falsy값 : 0 , '', false , NaN , null , undefined
{
    const a = 0;
    const b = a || 3;   // || 연산자는 falsy값이면 뒤로 넘어감
    console.log(b); //  3

    const c = 0;
    const d = c ?? 3;   // ?? 연산자는 null과 undefined 일 때만 뒤로 넘어감
    console.log(d); //  0

    const e = null;
    const f = e ?? 3;
    console.log(f); //  3

    const g = undefined;
    const h = g ?? 3;
    console.log(h); //  3
}

console.log("==============================");
const a = '0';
console.log(a);

console.log("==============================");
{
    const a = {};
    console.log(a.b);   //undefined
    // a가 객체이므로 문제없음

    //
    const c = null;

    console.log(c?.d);

    console.log("==============================");
    //c.d;
    try {
        c.d;
    } catch (e) {
        //console.log(e); //TypeError: Cannot read properties of null (reading 'd')
    }

}
