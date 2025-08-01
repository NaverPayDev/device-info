# @naverpay/device-info

> 기기 ID를 사용자 친화적인 모델명으로 변환하는 라이브러리

## 설치

```bash
npm install @naverpay/device-info
# or
yarn add @naverpay/device-info
# or
pnpm add @naverpay/device-info
```

## 빠른 시작

```javascript
import { ios, aos } from "@naverpay/device-info";

console.log(ios["iPhone15,4"]); // 'iPhone 15'
console.log(aos["SM-S901B"]); // 'Galaxy S22'
```

## API

### `ios`

iOS 기기 식별자와 모델명 매핑을 담은 객체입니다.

- **타입**: `Record<string, string>`
- **예시**: `iPhone14,2` → `iPhone 13 Pro`

### `aos`

Android 기기 모델과 마케팅명 매핑을 담은 객체입니다.

- **타입**: `Record<string, string>`
- **예시**: `SM-G991B` → `Galaxy S21 5G`

## 예제

### 기본 사용법

```javascript
import { ios, aos } from "@naverpay/device-info";

// iOS
const iosModel = ios["iPhone14,2"] || "알 수 없는 iPhone";

// Android
const androidModel = aos["SM-G991B"] || "알 수 없는 Android";
```

### 대체값 사용

```javascript
function getDeviceName(deviceId, platform) {
  if (platform === "ios") {
    return ios[deviceId] || `알 수 없는 iOS (${deviceId})`;
  } else if (platform === "android") {
    return aos[deviceId] || `알 수 없는 Android (${deviceId})`;
  }
  return "알 수 없는 기기";
}
```

## 자주 묻는 질문

**Q: 데이터는 얼마나 자주 업데이트되나요?**  
A: 공식 소스에서 매주(월요일마다) 기기 데이터를 업데이트합니다.

**Q: 기기 ID를 찾을 수 없으면 어떻게 되나요?**  
A: 라이브러리는 `undefined`를 반환합니다. 항상 대체값을 제공하세요.

**Q: 데이터는 어디서 가져오나요?**  
A:

- iOS: [The Apple Wiki](https://theapplewiki.com/wiki/Models)
- Android: [Google Play 지원 기기](https://storage.googleapis.com/play_public/supported_devices.html)

## 라이선스

MIT
