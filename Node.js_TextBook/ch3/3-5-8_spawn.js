const spawn = require('child_process').spawn;

const process = spawn('node', ['3-5-8_exec.js'], { shell: true });  //{ shell: true } 옵션을 사용하면, exec와 동일하게 쉘을 실행해서 명령어 수행함.

process.stdout.on('data', (data) => {
    console.log(data.toString());
}); //실행결과

process.stderr.on('data', data => console.error(data.toString()));    //  실행에러

// Handle process closure
process.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
});