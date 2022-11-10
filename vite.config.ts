import path from 'path';

import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tsconfigPaths({
      extensions: ['.ts', '.js'],
    }),
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
});
