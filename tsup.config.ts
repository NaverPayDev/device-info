import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts", "./src/ios.ts", "./src/aos.ts"],
  minify: false,
  dts: true,
  format: ["esm", "cjs"],
  clean: true,
});
