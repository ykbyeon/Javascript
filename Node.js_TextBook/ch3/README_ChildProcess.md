# Child Process

### 차이점: `exec` vs `spawn`

**`exec`**

- **Buffering**: `exec`는 명령어의 출력을 버퍼에 저장합니다. 이는 작은 양의 데이터 처리에 적합합니다.
- **Shell**: 기본적으로 쉘을 통해 명령어를 실행하므로 쉘 기능(파이프, 리다이렉션 등)을 사용할 수 있습니다.
- **Output Limit**: 출력이 1MB를 초과하면 에러가 발생할 수 있습니다[2][3].

**`spawn`**

- **Streaming**: `spawn`은 스트림을 통해 데이터를 처리합니다. 이는 대량의 데이터를 다룰 때 유리합니다.
- **No Shell by Default**: 기본적으로 쉘을 생성하지 않으므로 `exec`보다 효율적입니다. 쉘 기능이 필요할 경우 `shell: true` 옵션을 사용해야 합니다[5].
- **Long-running Processes**: 장시간 실행되는 프로세스에 적합합니다[3].

### 예제 코드

**`exec` 예제**

```javascript
const { exec } = require('child_process');

exec('ls -lh', (error, stdout, stderr) => {
  if (error) {
    console.error(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout:\n${stdout}`);
});
```

- 이 코드는 `ls -lh` 명령어를 실행하고 결과를 버퍼에 저장한 후 출력합니다.

**`spawn` 예제**

```javascript
const { spawn } = require('child_process');

const ls = spawn('ls', ['-lh']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
```

- 이 코드는 `ls -lh` 명령어를 실행하고 결과를 스트림으로 처리하여 출력합니다.

이 두 방법은 각각의 용도에 맞게 선택하여 사용하면 됩니다. 작은 양의 데이터를 처리하거나 쉘 기능이 필요한 경우 `exec`, 대량의 데이터를 스트리밍하거나 장시간 실행되는 프로세스에는 `spawn`을 사용하는 것이 좋습니다.

Citations:
[1] https://nodejs.org/api/child_process.html
[2] https://www.javatpoint.com/nodejs-child-process
[3] https://stackoverflow.com/questions/48698234/node-js-spawn-vs-execute/48698373
[4] https://www.digitalocean.com/community/tutorials/how-to-launch-child-processes-in-node-js
[5] https://www.freecodecamp.org/korean/news/node-js-child-processes-everything-you-need-to-know-e69498fe970a/
