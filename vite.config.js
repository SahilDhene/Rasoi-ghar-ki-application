import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script',
      includeAssets: ['logo.svg', 'icons/apple-touch-icon.png'],
      manifest: {
        name: 'Ghar Ki Rasoi',
        short_name: 'Rasoi',
        start_url: '/',
        display: 'standalone',
        background_color: '#f8f9fa',
        lang: 'en',
        scope: '/',
        description: 'Family grocery tracker — track your kitchen, together',
        theme_color: '#ffffff',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          // full-bleed version: Android crops it into its own shape (circle, squircle…)
          { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        importScripts: ['/sw-push.js'],
        // precache app shell + Fluent 3D emoji so the app works offline
        globPatterns: ['**/*.{js,css,html,png,webp}'],
        navigateFallback: 'index.html',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/dpuftvtcfznczisdynbb\.supabase\.co\/.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-api',
              networkTimeoutSeconds: 3,
              cacheableResponse: { statuses: [200] },
              expiration: { maxAgeSeconds: 300, maxEntries: 50 },
            },
          },
        ],
      },
    }),
  ],
})
