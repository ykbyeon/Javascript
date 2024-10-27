const exec = require('child_process').exec;

const process = exec('dir');

process.stdout.on('data', function (data) {
    console.log(data.toString('utf8'));
}); //실행결과

process.stderr.on('data', function (data) {
    console.error(data.toString('utf8'));
}); //실행에러
