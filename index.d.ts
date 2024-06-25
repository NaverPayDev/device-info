declare module "@naverpay/device-info" {
  export interface DeviceInfo {
    [key: string]: string;
  }

  const iOS: DeviceInfo;
  const aos: DeviceInfo;
  const date: string;

  export default {
    iOS,
    aos,
    date,
  };
}
