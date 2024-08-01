import { defineConfig } from 'vite';
// import react from "@vitejs/plugin-react";
import react from "@vitejs/plugin-react-swc";
import mkcert from 'vite-plugin-mkcert';
import * as path from 'path';

export default defineConfig({
  plugins: [
    react(),
    mkcert(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // port: 5127, // Default = 5173
    /** @DOCS : https://vitejs.dev/config/server-options.html#server-strictport */
    host: true,
  },
  build: {
    minify: 'terser',
    // sourcemap: false,
    // reportCompressedSize: false, // For fast build
  },
});
