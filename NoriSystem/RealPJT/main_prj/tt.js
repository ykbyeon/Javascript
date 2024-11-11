


const fnSync01 = () => {
    return 1;
}

const fnASync01 = async () => {
    console.log ( 'fnASync01');
    return 2;
}

const fnSyncButPromise = () => {
    const pr = new Promise( (resolve, reject) => {
        console.log ( 'fnSyncButPromise');
        resolve(3);
    });
    return pr;
}


const a = await fnASync01(); // 어딘지 모를 위치에 홰당 모듈을 실행하도록 위임
const b = await fnSyncButPromise(); // 어딘지 모를 위치에 홰당 모듈을 실행하도록 위임
const c = fnSync01(); // blocking 후 처리 ...

console.log ( a, b, c);

console.log ( a );
console.log(b);
//a.then( (v) => { console.log ( `A Result : ${v}`)});    //  위임 처리후 결과를 출력해줘 ...
//b.then( (v) => { console.log ( `B Result : ${v}`)});    //  위임 처리후 결과를 출력해줘 .. 
console.log(`C Result : ${c}`); //   이미 처리됨 .. 



