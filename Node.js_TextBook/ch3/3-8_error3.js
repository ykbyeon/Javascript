const fs = require('fs').promises;

setInterval(() => {
    fs.unlink('./abcdefg.js').catch(err => console.error(err)); //
}, 1000);