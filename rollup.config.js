import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-ts";
import babel from "rollup-plugin-babel";
const babelenvplugin = babel({
    sourceMaps: true,
    inputSourceMap: true,
    babelHelpers: "bundled",
    presets: [
        [
            "@babel/preset-env",
            {
                targets: [
                    "last 1 edge version",
                    "last 1 safari version",
                    "last 1 chrome version",
                    "last 1 firefox version",
                ],
            },
        ],
    ],
    plugins: [
        "@babel/plugin-proposal-optional-catch-binding",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-syntax-nullish-coalescing-operator",
        "@babel/plugin-proposal-nullish-coalescing-operator",
    ],
});
const beautifyplugin = terser({
    compress: false,

    mangle: false,
    output: {
        comments: !1,
        beautify: true,
    },
});
const tersercompressplugin = terser({
    sourcemap: true,
    toplevel: true,
    output: {
        comments: !1,
        ascii_only: !0,
    },
    compress: {
        toplevel: true,
        unused: true,
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log"],
    },
    mangle: { properties: false },
});
export default [
    {
        input: "./src/index.ts",
        output: [
            {
                file: "./dist/index.js",
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [json(), resolve(), commonjs(), typescript(), beautifyplugin],
    },
    {
        input: "./dist/index.js",
        output: [
            {
                file: "./dist/index.min.js",
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            babelenvplugin,
            resolve(),
            commonjs(),
            json(),
            tersercompressplugin,
        ],
    },
];
