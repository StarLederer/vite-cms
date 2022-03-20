import typescript from "@rollup/plugin-typescript";
import { builtinModules } from "module";

/**
 * @type import('rollup').RollupOptions
 */
const plugin = {
  input: "src/index.ts",
  output: {
    dir: "lib",
    format: "es",
  },
  plugins: [
    typescript({
      outDir: "lib/types",
    }),
  ],
  external: builtinModules,
};


export default plugin;
