import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'window.__vite_plugin_react_preamble_installed__': 'true'
  },
  server: {
    port: 3000,
    host: true,
  },
});
