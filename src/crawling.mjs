import fetchDeviceInfoAOS from "./aos.mjs";
import fetchDeviceInfoIOS from "./ios.mjs";
import writeDate from "./date.mjs";

fetchDeviceInfoAOS();
fetchDeviceInfoIOS();
writeDate();
