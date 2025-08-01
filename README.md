# @naverpay/device-info

> A library for converting device IDs to user-friendly model names

## Installation

```bash
npm install @naverpay/device-info
# or
yarn add @naverpay/device-info
# or
pnpm add @naverpay/device-info
```

## Quick Start

```javascript
import { ios, aos } from "@naverpay/device-info";

console.log(ios["iPhone15,4"]); // 'iPhone 15'
console.log(aos["SM-S901B"]); // 'Galaxy S22'
```

## API

### `ios`

Object containing iOS device identifier to model name mappings.

- **Type**: `Record<string, string>`
- **Example**: `iPhone14,2` → `iPhone 13 Pro`

### `aos`

Object containing Android device model to marketing name mappings.

- **Type**: `Record<string, string>`
- **Example**: `SM-G991B` → `Galaxy S21 5G`

## Examples

### Basic Usage

```javascript
import { ios, aos } from "@naverpay/device-info";

// iOS
const iosModel = ios["iPhone14,2"] || "Unknown iPhone";

// Android
const androidModel = aos["SM-G991B"] || "Unknown Android";
```

### With Fallback

```javascript
function getDeviceName(deviceId, platform) {
  if (platform === "ios") {
    return ios[deviceId] || `Unknown iOS (${deviceId})`;
  } else if (platform === "android") {
    return aos[deviceId] || `Unknown Android (${deviceId})`;
  }
  return "Unknown Device";
}
```

## FAQ

**Q: How often is the data updated?**  
A: Device data is updated weekly (every Monday) from official sources.

**Q: What if a device ID is not found?**  
A: The library returns `undefined`. Always provide a fallback value.

**Q: Where does the data come from?**  
A:

- iOS: [The Apple Wiki](https://theapplewiki.com/wiki/Models)
- Android: [Google Play Supported Devices](https://storage.googleapis.com/play_public/supported_devices.html)

## License

MIT
