import axios from 'axios'
import message from '@/utils/messager';
import {get_token} from '@/utils/cookies';
import router from '@/permission'


const instance = axios.create({
    baseURL: '/api',
    // baseURL: 'api',
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
        'X-Custom-Header': 'code-miner'

    }
});


instance.interceptors.request.use(function (config) {

    //是否登录
    let token = get_token();
    // 当前路由
    const current_path = router.currentRoute.value.path
    //请求是否需要认证接口
    const auth = config.auth
    //需要登录的页面
    const {requiresAuth} = router.currentRoute.value.meta
    //表示登录和需要登录页面
    if (!token && (auth || requiresAuth)) {
        router.push({
            path: '/login',
            query: {next: current_path}
        })
        return Promise.reject({
            response: {
                data: {
                    status: 400,
                    msg: '需要登入哦！！'
                }
            }
        })
    }

    //去除auth参数
    config.auth = undefined
    config.url = config.url + '?offsetTime=' + new Date().getTime().toString()
    if (token) {
        config.headers['TOKEN'] = token
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});


instance.interceptors.response.use(async function (response) {
    return response.data;
}, function (error) {
    const {response} = error
    if (response?.status === 403) {
        message('需要登入哦！！', 'warning');
        router.push('/login')
    } else if (response?.status === 429) {

        window.location.href = "https://www.baidu.com";
    } else if (response?.status >= 500) {
        // Handle server errors
        message('请求失败', 'error');
    } else if (response?.data?.msg) {
        // Handle other errors

        let error_res = response?.data;
        message(error_res?.msg, 'warning',false, true)
    } else {
        message('未知错误，请稍后重试！', 'warning');

    }
    return Promise.reject(error);

});

export default instance
