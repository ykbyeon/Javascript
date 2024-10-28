let i = 0;
setInterval(() => {
    console.log('시작');
    try {
        i += 1;
        if (i === 11) {
            process.exit(0);
        }
        throw new Error(`서버를 고장내주마! 시도: ${i}`);
    } catch (err) {
        console.error(err);
    }
}, 1000);