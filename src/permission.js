//todo 路由守卫
import router from '@/router';
import store from '@/store';
import {get_token, remove_token} from '@/utils/cookies';
import message from '@/utils/messager';
import {hideFullLoading, showFullLoading} from '@/utils/process';


router.beforeEach((to, from, next) => {
    showFullLoading();
    const token = get_token();
    //如果存在user并且token合格就已登录
    store.dispatch('selectAsync')


    if (to.meta.title) {
        document.title = to.meta.title
    }

    if (token) {
        store.dispatch('userAsync')
        //如果存在token赋值true,可以对任何进行操作
        to.meta.islogin = true;
        //重复登入 直接登出防止用户修改token后异常
        if (to.path === '/login') {
            message('你已登出', 'warning', true);
            remove_token()
            return next({path: '/login'})
        }
    } else {
        //需要登入的
        if (to.meta.requiresAuth) {
            remove_token();
            message('需要登入哦!', 'warning', false, true);
            return next({path: '/login'});
        }
    }
    return next();
});
router.afterEach((to, from) => {
    hideFullLoading();
});
export default router;
