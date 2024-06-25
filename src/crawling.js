import fetchDeviceInfoAOS from "./aos.js";
import fetchDeviceInfoIOS from "./ios.js";
import writeDate from "./date.js";

fetchDeviceInfoAOS();
fetchDeviceInfoIOS();
writeDate();
