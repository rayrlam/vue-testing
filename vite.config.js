import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.ts'],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    test: {
        // enable jest-like global test APIs
        globals: true,
        // simulate DOM with jsdom
        environment: 'jsdom',
        // exclude node_modules
        exclude: ["node_modules"],
        // support tsx/jsx
        include: ['./resources/js/**/__tests__/*.{test,unit,spec}.{js,ts,jsx,tsx}'],
    },
});