import fetchDeviceInfoAOS from "./aos.mjs";
import fetchDeviceInfoIOS from "./ios.mjs";
import writeDate from "./date.mjs";

await fetchDeviceInfoAOS();
await fetchDeviceInfoIOS();
await writeDate();
