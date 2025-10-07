import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'
import path from 'path'
import vitePluginTime from './plugin/vite-plugin-build-timer'

export default defineConfig((): UserConfig => {
    return {
        plugins: [
            vitePluginTime({ msg: 'my vite demo' })
        ],
        build: {
            // manifest: true,
            // sourcemap: true,
            outDir: 'dist',
            ssr: true,
            rollupOptions: {
                input: {
                    'main': path.resolve(__dirname, 'main.ts'),
                },
                output: {
                    manualChunks: (id: string) => {
                        return 'my'
                    },
                    entryFileNames: '[name].js',
                    chunkFileNames: '[name].js',
                    format: 'es'
                }
            },
            minify: false
        }
    }
})