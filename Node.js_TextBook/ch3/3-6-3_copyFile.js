const fs = require('fs').promises;

fs.copyFile('3-6-2_readme4.txt', '3-6-3_writeme4.txt')
    .then(() => {
        console.log('복사 완료');
    })
    .catch((error) => {
        console.error(error);
    });