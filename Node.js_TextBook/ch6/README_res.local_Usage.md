**`res.locals`**는 Express.js에서 서버 측에서 데이터를 저장하고, 이를 템플릿 엔진에서 사용할 수 있도록 전달하는 데 자주 사용됩니다. 대표적인 사례는 다음과 같습니다:

### **1. 템플릿 렌더링 시 데이터 전달**
`res.locals`는 템플릿 엔진에 데이터를 전달하는 데 주로 사용됩니다. 예를 들어, 사용자가 로그인했는지 여부와 같은 정보를 `res.locals`에 저장하고, 이를 템플릿에서 조건부로 렌더링할 수 있습니다.

- **예시:**
  ```javascript
  app.use((req, res, next) => {
    res.locals.isAuthenticated = req.user ? true : false;
    next();
  });

  app.get('/dashboard', (req, res) => {
    res.render('dashboard'); // 템플릿에서 isAuthenticated 변수를 사용할 수 있음
  });
  ```

이 경우, `isAuthenticated` 값은 `dashboard` 템플릿에서 바로 접근 가능하며, 사용자가 로그인했는지 여부에 따라 다른 UI를 렌더링할 수 있습니다[1][2].

### **2. 미들웨어 간 데이터 공유**
`res.locals`는 여러 미들웨어 간에 데이터를 전달하는 데도 유용합니다. 예를 들어, 데이터베이스 쿼리 결과를 하나의 미들웨어에서 처리한 후, 그 결과를 다음 미들웨어에서 사용할 수 있습니다.

- **예시:**
  ```javascript
  app.use((req, res, next) => {
    // 데이터베이스 쿼리 실행 후 결과 저장
    res.locals.userData = { name: 'John', age: 30 };
    next();
  });

  app.get('/profile', (req, res) => {
    // 이전 미들웨어에서 설정한 userData를 사용
    res.render('profile');
  });
  ```

이 경우, `userData`는 `/profile` 경로로 요청이 들어왔을 때 템플릿에 전달되어 렌더링됩니다[3].

### **3. 요청별 사용자 정보 저장**
사용자 인증 정보나 요청 경로와 같은 요청별 데이터를 저장하여 뷰에서 사용할 수 있습니다.

- **예시:**
  ```javascript
  app.use((req, res, next) => {
    res.locals.currentUser = req.user; // 현재 사용자 정보 저장
    next();
  });

  app.get('/settings', (req, res) => {
    res.render('settings'); // settings 템플릿에서 currentUser 사용 가능
  });
  ```

이 패턴은 사용자별 맞춤형 페이지를 제공할 때 유용합니다[4].

### **결론**
`res.locals`는 주로 서버 측에서 데이터를 저장하고 이를 템플릿 엔진에 전달하는 데 사용됩니다. 특히 로그인 상태나 사용자 정보를 저장하여 다양한 페이지에서 이를 활용하는 것이 일반적인 사용 사례입니다.

**Citations:**   
[1] https://www.geeksforgeeks.org/express-js-res-locals-property/   
[2] https://stackoverflow.com/questions/67854121/node-js-does-res-locals-get-sent-to-client   
[3] https://stackoverflow.com/questions/33451053/req-locals-vs-res-locals-vs-res-data-vs-req-data-vs-app-locals-in-express-mi   
[4] https://www.tutorialspoint.com/res-locals-property-in-express-js   
[5] https://www.youtube.com/watch?v=IuqhkjkcXbo   
