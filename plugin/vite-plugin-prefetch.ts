import type { Plugin } from "vite";

interface myPluginOptions {

}

export default function prefetchPlugin(option: myPluginOptions = {}): Plugin {
    return {
        name: 'vite-plugin-prefetch',
        apply: "build",
        // 转换index.html的专用钩子。钩子接收当前的HTML字符串和转换上下文ctx
        transformIndexHtml(html: string, ctx?: any) {
            // ctx.bundle即为最终要输出文件的清单manifest
            const tags = Object.values(ctx.bundle)
                // 通过源码路径过滤得到所有src/views下懒加载的二级页面对应的js
                .filter((item: any) => {
                    return item.type === 'chunk' && item.isDynamicEntry
                        && item.facadeModuleId && item.facadeModuleId.includes('/src/views/')
                })
                // 将二级页面模块变为ref=prefetch的link标签插入html的head中
                .map((chunk: any) => ({
                    tag: 'link',
                    attrs: { rel: 'prefetch', as: 'script', href: `/${chunk.fileName}` },
                    injectTo: 'head' as const
                }))
            return { html, tags };
        }
    }
}