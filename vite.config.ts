import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true
        },
        includeAssets: [],
        manifest: {
          name: 'penniesusa',
          short_name: 'penniesusa',
          description: 'Discover your global purchasing power. Convert your net worth into 130+ currencies.',
          theme_color: '#14b8a6',
          background_color: '#fcfaf7',
          display: 'standalone',
          start_url: '/',
          icons: [
            {
              src: 'https://generativelanguage.googleapis.com/v1beta/files/input_file_2.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'https://generativelanguage.googleapis.com/v1beta/files/input_file_2.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        },
        workbox: {
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true
        }
      })
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
