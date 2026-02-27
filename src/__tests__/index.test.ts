import { describe, it, expect } from "vitest";
import { ios, aos, date, isIOSDeviceString, isAndroidDeviceString } from "../index";

describe("ios", () => {
  it("should contain known device identifiers", () => {
    expect(ios["iPhone15,4"]).toBe("iPhone 15");
  });

  it("should not contain Unknown key", () => {
    expect(ios).not.toHaveProperty("Unknown");
  });
});

describe("aos", () => {
  it("should contain known device models", () => {
    expect(typeof aos["SM-S901B"]).toBe("string");
  });
});

describe("date", () => {
  it("should be a valid ISO date string", () => {
    expect(new Date(date).toISOString()).toBe(date);
  });
});

describe("isIOSDeviceString", () => {
  it("should return true for valid iOS identifier", () => {
    expect(isIOSDeviceString("iPhone15,4")).toBe(true);
  });
  it("should return false for invalid value", () => {
    expect(isIOSDeviceString("not-a-device")).toBe(false);
  });
  it("should return false for non-string", () => {
    expect(isIOSDeviceString(123)).toBe(false);
  });
});

describe("isAndroidDeviceString", () => {
  it("should return true for valid Android model", () => {
    expect(isAndroidDeviceString("SM-S901B")).toBe(true);
  });
  it("should return false for invalid value", () => {
    expect(isAndroidDeviceString("not-a-device")).toBe(false);
  });
});
