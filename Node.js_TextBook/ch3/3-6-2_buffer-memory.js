const fs = require('fs');

console.log('before: ', process.memoryUsage().rss);

const data1 = fs.readFileSync('./3-6-2_big.txt');
fs.writeFileSync('./3-6-2_big2.txt', data1);
console.log('buffer: ', process.memoryUsage().rss);