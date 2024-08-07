export { default as ios } from "./data/ios.json";
export { default as aos } from "./data/aos.json";
export { default as date } from "./data/date.js";

import ios from "./data/ios.json";
import aos from "./data/aos.json";

export function isIOSDeviceString(value: unknown): value is keyof typeof ios {
  return (
    typeof value === "string" && ios[value as keyof typeof ios] !== undefined
  );
}

export function isAndroidDeviceString(
  value: unknown
): value is keyof typeof aos {
  return (
    typeof value === "string" && aos[value as keyof typeof aos] !== undefined
  );
}
