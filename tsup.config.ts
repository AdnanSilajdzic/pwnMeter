import { defineConfig } from "tsup";

export default defineConfig({
  format: ["cjs", "esm"],
  entry: ["./src/index.ts"],
  dts: {
    resolve: true,
  },
  tsconfig: "./tsconfig.bundle.json",
  shims: true,
  skipNodeModulesBundle: true,
  clean: true,
  loader: {
    ".css": "copy",
    ".svg": "copy",
    ".png": "copy",
    ".jpg": "copy",
    ".jpeg": "copy",
    ".gif": "copy",
  },
  publicDir: false,
  esbuildOptions(options) {
    options.assetNames = "[name]";
  },
});
