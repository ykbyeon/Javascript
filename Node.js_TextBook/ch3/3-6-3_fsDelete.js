const fs = require('fs').promises;

fs.readdir('./folder')
    .then((dir) => {
        console.log('플더 내용 확인', dir);
        return fs.unlink('./folder/3-6-3_newfile.js', dir);
    })
    .then(() => {
        console.log('파일 삭제 성공');
        return fs.rmdir('./folder');
    })
    .then(() => {
        console.log('폴더 삭제 성공')
    })
    .catch((err) => {
        console.error(err);
    });