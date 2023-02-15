import {fileURLToPath, URL} from 'node:url';
import WindiCSS from 'vite-plugin-windicss';
import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import viteCompression from 'vite-plugin-compression';
import importToCDN from 'vite-plugin-cdn-import'
import visualizer from "rollup-plugin-visualizer";

export default defineConfig(({command, mode}) => {
    // 根据当前工作目录中的 `mode` 加载 .env 文件
    // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
    const env = loadEnv(mode, process.cwd(), '')

    return {

        base: env.ENV === 'production' ? '/' : './',
        define: {},
        plugins: [
            vue(),
            WindiCSS(),
            //支持gzip模式
            viteCompression({
                verbose: true, // 默认即可
                disable: false, //开启压缩(不禁用)，默认即可
                deleteOriginFile: false, //删除源文件
                threshold: 10240, //压缩前最小文件大小
                algorithm: 'gzip', //压缩算法
                ext: '.gz', //文件类型
            }),
            //打包视图
            // visualizer({
            //     emitFile: true,//是否被触摸
            //     filename: "test.html",//生成分析网页文件名
            //     open: true,//在默认用户代理中打开生成的文件
            //     gzipSize: true,//从源代码中收集 gzip 大小并将其显示在图表中
            //     brotliSize: true,//从源代码中收集 brotli 大小并将其显示在图表中
            // }),
            //todo 引入cdn
            importToCDN({
                modules: [

                    {
                        name: 'vue',
                        var: 'Vue',
                        path: 'https://cdn.staticfile.org/vue/3.2.47/vue.global.prod.min.js'
                    },
                    {
                        name: 'element-plus',
                        var: 'ElementPlus',
                        path: `https://cdn.staticfile.org/element-plus/2.2.30/index.full.min.js`,
                        css: 'https://cdn.staticfile.org/element-plus/2.2.30/index.css'
                    },
                    {
                        name: 'axios',
                        var: 'axios',
                        path: 'https://cdn.staticfile.org/axios/1.3.3/axios.js'
                    },
                    {
                        name: 'vue-router',
                        var: 'VueRouter',
                        path: 'https://cdn.staticfile.org/vue-router/4.1.6/vue-router.global.prod.min.js'
                    },
                    {
                        name: 'vuex',
                        var: 'Vuex',
                        path: 'https://cdn.staticfile.org/vuex/4.1.0/vuex.global.prod.min.js'
                    },


                ]
            })
        ],
        resolve: {
            alias: {
                //自动生成别名以后src都是@
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            }
        },
        server: {
            https: env.ENV === 'production',
            hmr: true,
            cors: true, // 默认启用并允许任何源
            // open: true, // 在服务器启动时自动在浏览器中打开应用程序
            proxy: {
                '/api': {
                    target: env.VITE_APP_BASE_URL, // 接口的域名
                    changeOrigin: true,
                    secure: true, // 如果是https接口，需要配置这个参数
                    //反向代理
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            }
        },

        /**
         * 打包
         */
        build: {
            chunkSizeWarningLimit: 1500,
            rollupOptions: {
                output: {
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString();
                        }
                    }
                }
            }
        }
    }
})


