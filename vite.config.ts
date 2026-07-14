import { defineConfig } from 'vite';

// base './' so the built bundle also works inside a Capacitor (iOS/Android)
// webview or any static host without path configuration.
export default defineConfig({
  base: './',
  server: { port: 5173 },
  build: { target: 'es2020' },
});
