# Express 라우터에서 async/await 사용하기

프론트에서 유튜브 비디오 아이디가 넘어오면 백엔드에서 진행되는 단계는 다음과 같습니다:

1. 비디오 아이디로 API 요청 후 댓글 가져오기
2. 특수문자, ㅠㅠ, ㅋㅋ, ㅎㅎ와 같은 한글, 숫자, 한글 이외의 언어를 공백으로 변환
3. 문장에서 단어만 추출하기
4. 최다빈도 단어 추출하기

이 네 가지 단계를 각 함수로 분리하고, 순서대로 진행할 수 있도록 `async/await` 구문을 이용해 프라미스를 반환하도록 만들었습니다.

그리고 라우터에 요청이 들어오면 이 네 가지 함수를 다시 `await`을 사용해서 순서대로 진행되게 만들어야 합니다. 이를 위해서는 라우터 함수에 `async`를 추가해야 하며, 아래와 같은 방식으로 작성할 수 있습니다:

```javascript
router.get('/', async (req, res) => {
    const result = await foo();
    res.send(result);
});
```

## 문제점: Unhandled Promise Rejection

위 코드에서 호출한 `async` 함수에서 예상치 못한 오류가 발생하면, Node.js는 **Unhandled promise rejection**을 출력하게 됩니다. 하지만 Express는 에러 발생을 인지하지 못해 응답이 지연될 수 있습니다. 또한, 오류 메시지에는 **Unhandled promise rejection**이 곧 **deprecated**될 예정이며, 앞으로는 노드 프로세스가 종료될 것이라는 경고가 표시됩니다:

```
DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

위에서 작성한 `async` 콜백 함수는 Promise를 반환하기 때문에 오류 발생 시 이를 처리하기 위해 `catch`로 처리해야 합니다. 그렇지 않으면 Express가 오류를 잡지 못합니다. 즉, 라우팅 핸들러 함수가 reject된 promise를 처리해줄 필요가 있습니다.

## 해결 방법

### 1. 라이브러리 사용하기

Express의 비동기 오류 처리를 쉽게 하기 위해 **express-asyncify** 같은 라이브러리를 사용할 수 있습니다:

```javascript
const express = require('express');
const asyncify = require('express-asyncify');

const app = express();
const router = asyncify(express.Router());

// ...

router.get('/', async (req, res) => {
    const result = await foo();
    res.send(result);
});
```

### 2. Wrapper 함수 사용하기

라이브러리를 사용하지 않고 직접 wrapper 함수를 작성하는 방법도 있습니다. 프로젝트가 간단하다면 이 방법이 더 적합할 수 있습니다:

```javascript
const wrap = asyncFn => {
    return (async (req, res, next) => {
        try {
            return await asyncFn(req, res, next);
        } catch (error) {
            return next(error);
        }
    });
};

router.get('/', wrap(async (req, res, next) => {
    const result = await foo();
    res.send(result);
}));
```

## 참고 사항

Koa는 라우트 핸들러에서 `async/await` 지원이 내장되어 있어 별도의 처리가 필요 없습니다.

---

### 'Project Log > CommentTeller' 카테고리의 다른 글

| 제목 | 날짜 |
| --- | --- |
| [배포 재도전기 - ETRI 형태소 분석 API사용](https://sustainable-dev.tistory.com/80) | 2019.10.03 |
| [프로젝트 후기](https://sustainable-dev.tistory.com/81) | 2019.09.24 |
| [Google Cloud Platform - App Engine으로 배포하기?](https://sustainable-dev.tistory.com/82) | 2019.09.22 |
| [Google Cloud Platform - App Engine으로 배포하기?](https://sustainable-dev.tistory.com/83) | 2019.09.21 |
| [삽질의 날 - redux-thunk, async/await, 유튜브 댓글 API](https://sustainable-dev.tistory.com/84) | 2019.09.20 |


**Citations:**   
[1] https://sustainable-dev.tistory.com/79   
[2] https://sustainable-dev.tistory.com/79   
