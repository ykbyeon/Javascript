## Node.js 교과서 - 기본기에 충실한 Node.js 18 입문서 | 3 판
- :link:[교보문고](https://product.kyobobook.co.kr/detail/S000200437346)  ( 저자 : [조현영](https://www.kyobobook.co.kr/service/profile/information?chrcCode=1000869802) )
- GitHub : [https://github.com/zerocho/nodejs-book](https://github.com/zerocho/nodejs-book)
<BR/>

<!-- 이미지 사이즈 조정 불가
![책표지](https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791140702398.jpg)
-->
<!-- 이미지 사이즈 조정 가능 -->
<img src=https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791140702398.jpg width="30%" height="30%" title="책표지" alt="BookCover"></img>

<br/>
<br/>

## **JavaScript 파일을 실행할 때, CommonJS 모듈인지 ECMAScript 모듈(ESM)인지 구분하는 방법**

Visual Studio Code에서 JavaScript 파일을 실행할 때, CommonJS 모듈인지 ECMAScript 모듈(ESM)인지 구분하는 방법은 주로 파일의 확장자와 `package.json` 설정에 따라 결정됩니다. 다음은 이를 구분하고 실행하는 방법입니다.

## **모듈 구분 방법**

- **파일 확장자**:
  - `.js`: `package.json`의 `type` 필드에 따라 해석됩니다.
  - `.cjs`: 항상 CommonJS로 해석됩니다.
  - `.mjs`: 항상 ESM으로 해석됩니다[5].

- **package.json 설정**:
  - `type: "commonjs"`: `.js` 파일은 CommonJS로 해석됩니다.
  - `type: "module"`: `.js` 파일은 ESM으로 해석됩니다[5].

## **실행 방법**

1. **CommonJS 모듈**:
   - **불러오기**: `require()` 함수를 사용합니다.
   - **내보내기**: `module.exports` 또는 `exports` 객체를 사용합니다.

   ```javascript
   // CommonJS 예제
   const myModule = require('./myModule');
   module.exports = {
       myFunction: function() { console.log('Hello from CommonJS'); }
   };
   ```

2. **ECMAScript 모듈 (ESM)**:
   - **불러오기**: `import` 키워드를 사용합니다.
   - **내보내기**: `export` 또는 `export default`를 사용합니다.

   ```javascript
   // ESM 예제
   import myModule from './myModule.js';
   export default function myFunction() { console.log('Hello from ESM'); }
   ```

## **실행 명령어**

- 터미널에서 Node.js를 사용하여 JavaScript 파일을 실행할 수 있습니다.
  - CommonJS 및 ESM 모두 Node.js에서 지원합니다. 하지만 ESM은 Node.js 12 이상에서만 지원됩니다[3][4].

```bash
# CommonJS
node myFile.js

# ESM (Node.js 12+)
node --experimental-modules myFile.mjs
```

## **주의사항**

- CommonJS는 동기적으로 모듈을 로드하며, 주로 서버 사이드(Node.js) 환경에서 사용됩니다[2][4].
- ESM은 비동기적으로 로드되며, 브라우저와 Node.js 모두에서 사용할 수 있습니다. 이는 트리 셰이킹과 같은 최적화 기법을 지원합니다[2][3].

이러한 설정을 통해 Visual Studio Code에서 JavaScript 파일을 CommonJS 또는 ESM으로 구분하여 실행할 수 있습니다.

**Citations:**   
[1] https://bitkunst.tistory.com/entry/Nodejs-%EC%8B%A4%ED%96%89%ED%95%98%EA%B8%B0-with-Visual-Studio-Code   
[2] https://f-lab.kr/insight/commonjs-vs-esmodule-20240523   
[3] https://sosodev.tistory.com/m/entry/Nodejs-CommonJS-vs-ESMECMAScript-Module-%EB%B9%84%EA%B5%90   
[4] https://dev.to/vinay_madan/difference-between-commonjs-and-esm-modules-4pff   
[5] https://toss.tech/article/commonjs-esm-exports-field   
