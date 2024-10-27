const fs = require('fs');

const readStream = fs.createReadStream('./3-6-2_readme4.txt');
const writeStream = fs.createWriteStream('./3-6-2_writeme3.txt');

readStream.pipe(writeStream);
