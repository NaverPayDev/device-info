import ios from "./data/ios.json";

export default ios;

export function isIOSDeviceString(value: unknown): value is keyof typeof ios {
  return typeof value === "string" && ios[value as keyof typeof ios] !== undefined;
}
