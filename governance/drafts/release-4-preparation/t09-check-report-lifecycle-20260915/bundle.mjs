// UNISSUED CANDIDATE. Compile the fixed TS graph without editing its sources.
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { resolve, relative } from "node:path";
const require = createRequire(import.meta.url);
const tsxRequire = createRequire(require.resolve("tsx/package.json"));
const esbuild = tsxRequire("esbuild");
const root = process.cwd(),
  entry = process.argv[2],
  outfile = process.argv[3];
await esbuild.build({
  entryPoints: [entry],
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node24",
  outfile,
  banner: {
    js: 'import {createRequire as __cr} from "node:module"; const require=__cr(import.meta.url);',
  },
  plugins: [
    {
      name: "fixed-module-paths",
      setup(build) {
        build.onLoad({ filter: /\.ts$/ }, (args) => ({
          contents: readFileSync(args.path, "utf8").replaceAll(
            "import.meta.url",
            JSON.stringify("file:///repo/" + relative(root, args.path).replaceAll("\\", "/")),
          ),
          loader: "ts",
        }));
      },
    },
  ],
});
