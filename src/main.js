import {createApp} from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from '@/App.vue';
import router from '@/permission'
import UndrawUi from 'undraw-ui';
import 'undraw-ui/dist/style.css';
import 'virtual:windi.css';
import '@/assets/font/fonts/iconfont.css'
import store from "@/store";
// import VueLazyLoad from 'vue-lazyload'


const app = createApp(App);
app.directive('scroll', (el, binding) => {
    /**
     * 禁止滑动
     * @type {CSSStyleDeclaration}
     */
    let dom = document.body.style
    if (binding.value) {
        dom.overflow = 'scroll'
    } else {
        dom.overflow = 'hidden'
    }
})

app.use(UndrawUi);
app.use(router);
app.use(store)
app.use(ElementPlus);
// app.use(VueLazyLoad, {
//     preLoad: 1,
//     error: '/siteico.png',
//     loading: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
//     attempt: 2,
// })
app.mount('#app');
