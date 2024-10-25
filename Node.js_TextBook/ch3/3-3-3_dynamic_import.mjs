const a = true;
if (a) {
    //import './3-3-1_func.js'; //에러발생
    const m1 = await import('./3-3-1_func.js');
    console.log(m1);
}

console.log('성공');

