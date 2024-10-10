const justCallback = (what) => {
    console.log(what, "Callback 이 호출 되었습니다.");
};


const runner = (fn) => {
    if (fn) {
        fn('참 입니다. ');
    } else {
        console.log('거짓입니다. ');
    }
};

runner(justCallback);
console.log('=========');
runner();