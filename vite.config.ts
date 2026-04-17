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
        registerType: 'prompt',
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
              src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%2314b8a6'/%3E%3Cg transform='translate(-5, 5) scale(1.1)'%3E%3Ccircle cx='40' cy='60' r='20' fill='%2314b8a6' stroke='white' stroke-width='4'/%3E%3Ctext x='40' y='67' font-family='Arial' font-size='20' font-weight='900' fill='white' text-anchor='middle'%3E1%3C/text%3E%3Ccircle cx='60' cy='40' r='20' fill='%2314b8a6' stroke='white' stroke-width='4'/%3E%3Ctext x='60' y='47' font-family='Arial' font-size='20' font-weight='900' fill='white' text-anchor='middle'%3E1%3C/text%3E%3C/g%3E%3Ccircle cx='85' cy='15' r='10' fill='white'/%3E%3Ccircle cx='85' cy='15' r='5' fill='%2314b8a6'/%3E%3C/svg%3E",
              sizes: '192x192',
              type: 'image/svg+xml'
            },
            {
              src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%2314b8a6'/%3E%3Cg transform='translate(-5, 5) scale(1.1)'%3E%3Ccircle cx='40' cy='60' r='20' fill='%2314b8a6' stroke='white' stroke-width='4'/%3E%3Ctext x='40' y='67' font-family='Arial' font-size='20' font-weight='900' fill='white' text-anchor='middle'%3E1%3C/text%3E%3Ccircle cx='60' cy='40' r='20' fill='%2314b8a6' stroke='white' stroke-width='4'/%3E%3Ctext x='60' y='47' font-family='Arial' font-size='20' font-weight='900' fill='white' text-anchor='middle'%3E1%3C/text%3E%3C/g%3E%3Ccircle cx='85' cy='15' r='10' fill='white'/%3E%3Ccircle cx='85' cy='15' r='5' fill='%2314b8a6'/%3E%3C/svg%3E",
              sizes: '512x512',
              type: 'image/svg+xml'
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
