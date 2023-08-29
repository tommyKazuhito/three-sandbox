import path from 'path';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
// import { createHtmlPlugin } from 'vite-plugin-html';
import tsconfigPaths from 'vite-tsconfig-paths';

const root = `./src`;
const publicDir = `../public`;

export default defineConfig({
  root,
  publicDir,
  plugins: [
    tsconfigPaths({
      root: '../',
    }),
    vue(),
    /* createHtmlPlugin({
      pages: [
        {
          entry: path.resolve(__dirname, './src/script/main.ts'),
          filename: 'index.html',
          template: path.resolve(__dirname, './src/html/index.html'),
        },
      ],
    }),*/
  ],
  preview: {
    open: true,
  },
  server: {
    host: '0.0.0.0',
    https: {
      key: path.resolve(__dirname, './certs/localhost-key.pem'),
      cert: path.resolve(__dirname, './certs/localhost.pem'),
    },
    port: Number(process.env.BS_PORT) || 3300,
    open: true,
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
});
