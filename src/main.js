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

//认证函数全局
/*
app.config.globalProperties.$islogin = (router) => {
    if (!router.currentRoute.value.meta.islogin) {
        message('需要登入哦!', 'warning');
        router.push('/login/');
        return true
    }
    return false;
}
 */
/*
app.directive('login', {
    created(el, binding, vnode) {
        console.log(binding.value,)
    },
});
*/


/**
 * 全局组件
 */
/*
app.component('navHeader', header);
app.component('navFooter', footer);

 */
app.use(UndrawUi);
app.use(router);
app.use(store)
app.use(ElementPlus);


app.mount('#app');
