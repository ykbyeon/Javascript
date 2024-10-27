const fs = require('fs');

console.log('before: ', process.memoryUsage().rss);

const readStream = fs.createReadStream('./3-6-2_big.txt');
const writeStream = fs.createWriteStream('./3-6-2_big3.txt');
readStream.pipe(writeStream);
readStream.on('end', () => {
    console.log('stream: ', process.memoryUsage().rss);
});

//buffer-memory
// before:  27017216
// buffer:  1028661248

//stream-memory
// before:  27062272
// stream:  59867136