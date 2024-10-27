const fs = require('fs');

fs.readFile('./3-6_readme.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data);
    console.log(data.toString());
});

