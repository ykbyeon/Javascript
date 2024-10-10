const justCallback = (what) => {
    console.log(what, "Callback 이 호출 되었습니다.");
};

const fnSimpleTest = (fn) => {
    console.log("Do Main Process");
    console.log("if Success Done ... just call callback ");
    if (true) {
        if (fn) {
            fn('sync 입니다. ');
        }
    }
}

// const fnPromiseTest = async (fn) => {
//     const p = new Promise((resolve, reject) => {
//         if (true) {
//             if (fn) {
//                 fn('async 입니다. ');
//             }
//             resolve("Done 입니다. ");
//         }
//     });

//     return p;
// }

const fnPromiseTest = (fn) => {
    const p = new Promise((resolve, reject) => {
        if (true) {
            if (fn) {
                fn('async 입니다. ');
            }
            resolve("Done 입니다. ");
        }
    });

    return p;
}

//fnSimpleTest(justCallback);

const pp = fnPromiseTest(justCallback);
console.log(`PP IS : ${pp}`);
pp.then((v) => console.log(v));



console.log('\n-----Simple Start-----')
fnSimpleTest(justCallback);
console.log('-----Simple End-----\n')