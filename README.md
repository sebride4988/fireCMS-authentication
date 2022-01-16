# fireCMS-authentication

fireCMS의 authentication

## 특징

- 해당 서브모듈은 fireCMS-core가 필요합니다.

## 사용하는 법

`<FireCMSCore>`에 서비스를 추가해준다. 코드를 추가한다.

```typescript
import Authentication from 'fireCMS/authentication';

...

// FireCMS 초기화
Core.initialize(firebaseConfig);
Core.initializeService(FireAuthentication);

const storeConfig = {
  reducer: {
    authentication: FireAuthentication.reducer,
  },
  devTools: true,
};

...
```
