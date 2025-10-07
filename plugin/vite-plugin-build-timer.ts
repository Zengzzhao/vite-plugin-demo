import type { Plugin } from 'vite'

// 参见配置
interface PluginOptions {
    msg?: string
}

export default function timePlugin(options: PluginOptions = {}): Plugin {
    const msg = options.msg ?? 'vite build'
    let startTime = 0
    return {
        name: 'vite-plugin-time', // 插件名
        apply: 'build', // 插件应用阶段：构建阶段
        // 开始构建钩子
        buildStart() {
            startTime = Date.now() // 开始时间
            console.log(`🏗️ ${msg} start`);
        },
        // 生成bundle钩子
        generateBundle() {
            const endTime = Date.now() // 结束时间
            const duration = ((endTime - startTime) / 1000).toFixed(2) // 构建耗时
            console.log(`✅ ${msg} finished in ${duration}s`);
            // 输出信息
            const state = {
                startTime: new Date(startTime).toISOString(),
                endTime: new Date(endTime).toISOString(),
                durationSeconds: parseFloat(duration),
            }
            // 利用插件上下文将信息写入最终打包产物中
            this.emitFile({
                type: 'asset',
                fileName: 'state.json',
                source: JSON.stringify(state, null, 2),
            })
        }
    }
}