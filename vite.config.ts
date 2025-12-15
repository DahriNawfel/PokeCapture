import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist'
  },
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
    }
  }
});
