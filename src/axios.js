import axios from 'axios'
import message from '@/utils/messager';
import {get_token} from '@/utils/cookies';
import router from '@/permission'
import {ElLoading} from 'element-plus'


let loading;
const startLoading = () => {
    // element-ui loading 服务调用方式
    loading = ElLoading.service({
        lock: true,
        text: '拼命加载中...',
        spinner: 'el-icon-loading',  // 自定义图标
        target: document.getElementById('content')
    })
}

// loading结束 方法
const endLoading = () => {
    loading.close()
}
const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    // baseURL: 'api',
    timeout: 1000,
    headers: {
        'X-Custom-Header': 'code-miner'
    }
});

export function request(opt) {
    return axios.create({
        baseURL: () => {
            let path = 'http://127.0.0.1:8000/api/'
            switch (opt) {
                case 'account': {
                    return path + opt
                }
                case 'operation': {
                    return path + opt
                }
                case 'hall': {
                    return path + opt
                }
            }
        },
        // baseURL: 'api',
        timeout: 1000,

    });
}

// const instanceFun = (path) => {
//     switch (path) {
//         case 'account': {
//             break
//         }
//         case 'operation': {
//             break
//         }
//     }
// }

instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log(router.currentRoute.value.meta)
    let token = get_token();
    config.url = config.url + '?offsetTime=' + new Date().getTime().toString()
    if (token) {
        config.headers['TOKEN'] = token
    }
    // startLoading()
    return config;
}, function (error) {

    return Promise.reject(error);
});


instance.interceptors.response.use(async function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // endLoading()
    return response.data;
}, function (error) {

    if (error.response.status === 403) {
        message('请先登录!!', 'warning');
        router.push('/login')
        return
    }
    if (error.response.status === 429) {
        message('操作频率过快,已被限流,稍后在试试', 'warning');
        //反扒重定向到百度
        return window.location.href = "https://www.baidu.com";
    }
    if (error.response.status > 500) {
        message('请求失败', 'error');
    }
    let error_res = error.response.data;

    message(error_res.msg, 'warning')
    // endLoading()
    return Promise.reject(new Error(error_res.msg));


});

export default instance
