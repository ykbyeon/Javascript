
const square = (n) => {
    return n*n;
}

const filter1 = (n,idx, arr ) => {
    return n % 3 == 0;
}

const testV = [];
const add = (a,b,idx,arr) => {
    testV.push(arr[idx]);
    return a+b;
};

let numbers = [1,2,3,4,5,6,7,8,9];

let num02 = numbers.map( (num) => num*num );
let num03 = numbers.map( square ); 

let num04 = numbers.filter( filter1 );
let num05 = numbers.reduce( add, 0 );
console.log ( num02, num03 );
console.log (`num 04 :  ${num04}`);
console.log (`num 05 :  ${num05} ::: ${testV}`);


const arrow = () =>  100 ;


console.log ( arrow() );

const add1 = (n, fn) => {
    if ( fn ) {
        return fn(n+1);
    }
    return n+1;
};

const add2 = (n, fn) => {
    if ( fn ) {
        return fn(n*2);
    }
    return n*2;
};

const commonAdd10 = (n) => {
    return n+10;
}

const fnArr = [add1,add2];

const result = fnArr.reduce( (ac,f,idx,arr) => {
    console.log ( "IN SIDE ", ac, " ::: ", f );
    return f(ac, commonAdd10);
}, 100);

console.log ( result );


const str = `
    this is test.
    line test
    what's up?
    it's the end ....
`;

const splitLines = ( v ) => {
    return v.split(/\r?\n/gi);
};

const checkLineIndexValue = (ckStr,vArr) => {
    const regs = new RegExp(  ckStr , "gi" );
    console.log ( vArr.length )
    for( let i=0, iSize = vArr.length; i < iSize; i++ ) {
        if ( regs.test(vArr[i])) {
            return { idx: i , value : vArr[i]};
        }
    }
}

const fArr = [splitLines, 'what', checkLineIndexValue];
const fResult = fArr.reduce( (ac, fn, idx, arr) => {
    if ( typeof fn === 'string') {
        ac.arg = fn;
        return ac;
    } else {
        ac.result = fn(ac.arg, ac.result);
        return ac;
    }
}, { arg:str, result:''} );

console.log ( fResult );


const fnTimes = ( fn, ...args ) => {
    console.time("speed");
    const result = fn(args);
    console.timeEnd("speed");
    return result;
}

const aFn = (n) => {
    return n*n;
};

const bFn = (...args) => {
    let result = 0;
    args.forEach( (v) => {
        result += v;
    });
    return result;
}

const bResult = fnTimes(bFn, 1,2,3);
console.log ( bResult );
