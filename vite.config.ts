import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { cpSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const pdfResources = ['cmaps', 'standard_fonts', 'wasm'];

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'local-pdf-resources',
      closeBundle() {
        for (const directory of pdfResources) {
          const destination = resolve(import.meta.dirname, 'dist/pdfjs', directory);
          mkdirSync(destination, { recursive: true });
          cpSync(resolve(import.meta.dirname, 'node_modules/pdfjs-dist', directory), destination, {
            recursive: true,
          });
        }
      },
      configureServer(server) {
        server.middlewares.use('/pdfjs', (req, _res, next) => {
          if (!pdfResources.some((directory) => req.url?.startsWith('/' + directory + '/')))
            return next();
          req.url = '/node_modules/pdfjs-dist' + req.url;
          next();
        });
      },
    },
  ],
  build: {
    rollupOptions: {
      output: {
        // EdgeOne serves .mjs assets as application/octet-stream. Module workers
        // need a JavaScript MIME type with nosniff, so emit them as .js.
        assetFileNames: (asset) =>
          asset.names.some((name) => name.endsWith('.mjs'))
            ? 'assets/[name]-[hash].js'
            : 'assets/[name]-[hash][extname]',
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
