# @naverpay/device-info

A library for converting device IDs to user-friendly model names.

- For iOS, it maps `Identifier` to `Generation`.
- For Android, it maps `Model` to Marketing `Name`.

These data are collected based on the following documents and updated every Monday:

- <https://storage.googleapis.com/play_public/supported_devices.html>
- <https://theapplewiki.com/wiki/Models>

## Installation

```bash
npm install --save @naverpay/device-info
```

## Usage

```javascript
import { ios, aos } from "@naverpay/device-info";

console.log(ios["iPhone15,4"]); // "iPhone 15"
console.log(aos["SM-S901B"]); // "Galaxy S22"
```
