import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
// import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		tailwindcss()
		// PWA temporalmente desactivado por error de build
		// VitePWA({
		// 	registerType: 'autoUpdate',
		// 	includeAssets: ['favicon.svg', 'icons/*.png', 'icons/*.svg'],
		// 	manifest: {
		// 		name: 'Emergencias - Entrenamiento',
		// 		short_name: 'Emergencias',
		// 		description: 'Entrenamiento gamificado en situaciones de emergencia',
		// 		theme_color: '#ef4444',
		// 		background_color: '#ffffff',
		// 		display: 'standalone',
		// 		orientation: 'portrait',
		// 		scope: '/',
		// 		start_url: '/',
		// 		icons: [
		// 			{
		// 				src: '/icons/icon-192x192.png',
		// 				sizes: '192x192',
		// 				type: 'image/png'
		// 			},
		// 			{
		// 				src: '/icons/icon-512x512.png',
		// 				sizes: '512x512',
		// 				type: 'image/png'
		// 			},
		// 			{
		// 				src: '/icons/icon-maskable-512x512.png',
		// 				sizes: '512x512',
		// 				type: 'image/png',
		// 				purpose: 'maskable'
		// 			}
		// 		]
		// 	},
		// 	workbox: {
		// 		globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
		// 		runtimeCaching: [
		// 			{
		// 				urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
		// 				handler: 'CacheFirst',
		// 				options: {
		// 					cacheName: 'google-fonts-cache',
		// 					expiration: {
		// 						maxEntries: 10,
		// 						maxAgeSeconds: 60 * 60 * 24 * 365
		// 					},
		// 					cacheableResponse: {
		// 						statuses: [0, 200]
		// 					}
		// 				}
		// 			}
		// 		]
		// 	}
		// })
	],
	// Aumentar timeout para evitar errores con lucide-svelte
	server: {
		hmr: {
			timeout: 60000
		}
	},
	optimizeDeps: {
		include: ['lucide-svelte']
	}
});
