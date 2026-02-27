import aos from "./data/aos.json";

export default aos;

export function isAndroidDeviceString(value: unknown): value is keyof typeof aos {
  return typeof value === "string" && aos[value as keyof typeof aos] !== undefined;
}
