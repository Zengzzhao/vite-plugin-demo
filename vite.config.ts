import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'
import path from 'path'

export default defineConfig((): UserConfig => {
    return {
        plugins: [
            
        ],
        build: {
            outDir: 'dist',
            rollupOptions: {
                input: {
                    'main': path.resolve(__dirname, 'index.html'),
                },
                output: {
                    entryFileNames: '[name].js',
                    chunkFileNames: '[name].js',
                    format: 'es'
                }
            },
            minify: false
        }
    }
})