import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import prefetchPlugin from './plugin/vite-plugin-prefetch'

export default defineConfig((): UserConfig => {
    return {
        plugins: [
            // Vue模板文件编译插件
            vue(),
            prefetchPlugin()
        ],
        server: {
            headers: {
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        },
        build: {
            outDir: 'dist',
            rollupOptions: {
                input: {
                    'main': path.resolve(__dirname, 'index.html'),
                },
                output: {
                    manualChunks: (id: string) => {
                        if (id.includes('node_modules')) {
                            if (id.includes('vue')) return 'vue'
                        }
                    },
                    entryFileNames: 'static/js/[name]-[hash].js',
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
                }
            },
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        }
    }
})