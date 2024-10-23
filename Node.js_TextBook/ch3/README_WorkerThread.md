# Worker Threads 기본개념 설명
Node.js의 **Worker Threads**는 JavaScript 코드를 병렬로 실행할 수 있도록 해주는 모듈입니다. 이 모듈은 Node.js의 단일 스레드 모델의 한계를 극복하기 위해 도입되었습니다. 기본적으로 Node.js는 단일 스레드 기반의 비동기 I/O 모델을 사용하지만, CPU 집약적인 작업을 처리할 때는 이 모델이 비효율적일 수 있습니다. Worker Threads를 사용하면 이러한 작업을 별도의 스레드에서 처리할 수 있어 성능을 향상시킬 수 있습니다[1][2][4].

## **Worker Threads의 주요 특징**

- **병렬 처리**: Worker Threads는 복잡한 계산이나 CPU 집약적인 작업을 메인 스레드와 독립적으로 수행할 수 있습니다. 이는 여러 CPU 코어를 활용하여 작업을 병렬로 처리할 수 있게 해줍니다[5].
- **별도의 V8 인스턴스**: 각 워커 스레드는 메인 스레드와 별개의 V8 인스턴스를 가지며, 독립적인 메모리 공간을 할당받습니다. 따라서 데이터 공유는 메시지 패싱을 통해 이루어집니다[5].
- **메시지 패싱**: 메인 스레드와 워커 스레드는 메시지를 주고받으며 통신합니다. 이를 통해 데이터를 주고받고, 작업을 지시하거나 결과를 받을 수 있습니다[3][5].

## **사용 예시**

```javascript
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename);
  worker.on('message', message => console.log(message));
  worker.postMessage('Hello, Worker!');
} else {
  parentPort.on('message', (message) => {
    parentPort.postMessage(message + ' Received');
  });
}
```

위 예시에서는 메인 스레드에서 워커 스레드를 생성하고, 워커 스레드와 메시지를 주고받는 간단한 구조를 보여줍니다. 워커 스레드는 메시지를 받고 처리한 후, 메인 스레드에 결과를 전송합니다[5].

Worker Threads는 Node.js 애플리케이션의 성능과 반응성을 향상시키는 데 매우 유용하며, 특히 이미지 처리, 대규모 데이터 처리, 복잡한 수학 계산 등 CPU 집약적인 작업에 적합합니다[4][5].

**Citations:**   
[1] https://cloudsoswift.github.io/post/develop/nodejs/about-thread-of-node-js/   
[2] https://velog.io/@elon/Node.js-Worker-threads-%EC%82%AC%EC%9A%A9%EB%B2%95   
[3] https://inpa.tistory.com/entry/NODE-%F0%9F%93%9A-workerthreads-%EB%AA%A8%EB%93%88   
[4] https://dlehdgml0480.tistory.com/32   
[5] https://f-lab.kr/insight/nodejs-worker-threads   

<br/>
<br/>

# Worker Threads vs Multi Process 차이점 설명
Node.js의 **Worker Threads**는 멀티 프로세스 방식과는 다릅니다. Worker Threads는 JavaScript 코드의 병렬 실행을 가능하게 하지만, 이는 전통적인 멀티스레딩과는 차이가 있습니다.

## **Worker Threads vs. 멀티 프로세스**

- **독립적인 V8 인스턴스**: 각 워커 스레드는 독립적인 V8 JavaScript 런타임을 가지고 있어, 메모리와 상태를 공유하지 않습니다. 이는 프로세스 간의 독립성과 유사합니다[1][2].

- **메시지 패싱**: 워커 스레드 간의 통신은 메시지 패싱을 통해 이루어집니다. 이는 프로세스 간 통신(IPC)과 유사한 방식입니다[1][4].

- **메모리 공유**: Worker Threads는 `SharedArrayBuffer`를 통해 메모리를 공유할 수 있지만, 이는 제한적으로 사용됩니다[4].

## **멀티스레딩이 아닌 이유**

- **실제 멀티스레딩 아님**: Worker Threads는 전통적인 의미의 멀티스레딩이 아닙니다. 각 스레드는 독립적으로 실행되며, 다른 스레드와 상태를 공유하지 않습니다. 이는 멀티 프로세스와 유사한 특성을 가집니다[1][3].

- **비용**: 많은 워커 스레드를 생성하는 것은 리소스를 많이 소모하며, 가벼운 작업에는 적합하지 않습니다[1].

따라서, Node.js의 Worker Threads는 멀티 프로세스와 유사한 방식으로 작동하지만, 실제로는 멀티스레딩을 구현하는 방법 중 하나로 볼 수 있습니다. CPU 집약적인 작업을 처리할 때 유용하며, Node.js의 단일 스레드 모델의 한계를 보완하는 데 사용됩니다.

**Citations:**  
[1] https://snyk.io/blog/node-js-multithreading-worker-threads-pros-cons/   
[2] https://amplication.com/blog/nodejs-worker-threads-vs-child-processes-which-one-should-you-use   
[3] https://www.digitalocean.com/community/tutorials/how-to-use-multithreading-in-node-js   
[4] https://nodejs.org/api/worker_threads.html   
[5] https://stackoverflow.com/questions/63224356/is-node-js-considered-multithreading-with-worker-threads   
