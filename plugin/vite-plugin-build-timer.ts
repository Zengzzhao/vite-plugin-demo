import type { Plugin } from 'vite'

interface PluginOptions {
    msg?: string
}

export default function timePlugin(options: PluginOptions = {}): Plugin {
    const msg = options.msg ?? 'vite build'
    let startTime = 0
    return {
        name: 'vite-plugin-time',
        apply: 'build',
        buildStart() {
            startTime = Date.now()
            console.log(`🏗️ ${msg} start`);
        },
        generateBundle() {
            const endTime = Date.now()
            const duration = ((endTime - startTime) / 1000).toFixed(2)
            console.log(`✅ ${msg} finished in ${duration}s`);
            const state = {
                startTime: new Date(startTime).toISOString(),
                endTime: new Date(endTime).toISOString(),
                durationSeconds: parseFloat(duration),
            }
            this.emitFile({
                type: 'asset',
                fileName: 'state.json',
                source: JSON.stringify(state, null, 2),
            })
        }
    }
}