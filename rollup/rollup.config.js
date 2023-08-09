import resolve from "@rollup/plugin-node-resolve";
import vue from "rollup-plugin-vue";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import scss from "rollup-plugin-scss";
import json from "@rollup/plugin-json";
import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle"
import copy from 'rollup-plugin-copy';

// const formatName = "SuperEp";

const config = {

   // 入口文件位置
   input: "./src/main.js",

   output: [

      // {
      //    file: "./lib/bundle.cjs.js",
      //    format: "cjs",
      //    name: formatName,
      //    exports: "auto",
      // },

      // {
      //    file: "./lib/bundle.iife.js",
      //    format: "iife",
      //    name: formatName,
      //    exports: "auto",
      // },

      {
         file: "./dist/bundle.es.js",
         format: "es",
         // name: formatName,
         sourcemap: true, // 生成源映射文件
      },

   ],

   plugins: [
      

      resolve({
         browser: true
      }),
      commonjs(),
      json(),

      vue({
         css: true,
         compileTemplate: true,
      }),

      babel({
         babelHelpers: 'bundled',
         exclude: "**/node_modules/**",
      }),

      
      scss(),

      excludeDependenciesFromBundle(),

      /* 文件拷贝 */
      copy({
         targets: [
            // 指定要复制的文件或目录
            { src: 'rollup/package.json', dest: 'dist' },
         ],

         // 可选配置:
         // 如果设置为 true，则执行文件覆盖操作
         // 默认为 false，即不覆盖已存在的文件
         copyOnce: true,
      }),

      copy({
         targets: [
            // 指定要复制的文件或目录
            { src: 'rollup/README.md', dest: 'dist' },
         ],

         // 可选配置:
         // 如果设置为 true，则执行文件覆盖操作
         // 默认为 false，即不覆盖已存在的文件
         copyOnce: true,
      }),

   ],

};

export default config;
