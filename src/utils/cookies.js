import Cookies from 'vue-cookie'

//获取token

export function get_token(key = 'code-token') {
    return Cookies.get(key)
}

//设置token
export function set_token(key, token) {
    //设置两个星期过期
    return Cookies.set(key, token, {expires: 60 * 24 * 24 * 14})
}

//删除token
export function remove_token(key = 'code-token') {
    return Cookies.delete(key)
}