# @naverpay/device-info

디바이스ID를 사용자에게 익숙한 모델명으로 변경하기 위한 라이브러리입니다. 

아래 두 문서를 기반으로 정보를 수집하며 매주 월요일마다 업데이트합니다.
- https://storage.googleapis.com/play_public/supported_devices.html
- https://theapplewiki.com/wiki/Models

## Installation

```bash
npm install --save @naverpay/device-info
```

## Usage

```javascript
import iOSDeviceInfo from '@naverpay/device-info/ios.json'
import androidDeviceInfo from '@naverpay/device-info/aos.json'

console.log(iosDeviceInfo['iPhone15,4']) // "iPhone 15"
```
