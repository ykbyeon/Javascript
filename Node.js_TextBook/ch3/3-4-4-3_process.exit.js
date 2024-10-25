let i = 1;
setInterval(() => {
    if (i === 10) {
        console.log('end');
        process.exit();
    }
    console.log(i);
    i += 1;
}, 100);
