import axios from "@/axios";


/**
 注册
 */
export function register({username, password, re_password, email}) {
    return axios.post("/account/register", {
        username,
        password,
        re_password,
        email,

    }, {auth: false})
}

/**
 * 登录
 */
export function login({username, password, loginemail, code}) {
    if (loginemail) {
        return axios.post("/account/user", {
            email: loginemail,
            code,
            opt: 1,
        }, {
            auth: false
        })
    }
    return axios.post("/account/user", {
        username,
        password,
        opt: 2,

    }, {auth: false})
}

/**
 * qq登录
 * @param user_code
 * @returns {*}
 */
export function tencentLogin(user_code) {
    return axios.post("/account/user", {
        user_code,
        opt: 3,
    }, {
        auth: false
    });
}

/**
 * 绑定qq
 * @param code
 * @param method
 * @returns {*}
 */
export function bindTencent(code, method) {
    switch (method) {
        case "post":
            return axios.post("/account/tencent", {
                code
            }, {auth: true});
        case "get":
            return axios.get("/account/tencent", {auth: true})
    }
}


/**
 * 获取用户信息
 * @returns {*}
 */
export function getInfo() {
    return axios.get("/account/user", {auth: true})
}

/**
 * 用户推荐
 */
export function recommend(form) {
    return axios.post("/account/recommend", {...form,}, {auth: true})
}

/**
 * 更新用户数据
 * @param name
 * @param qq
 * @param habit
 * @param userAvatar
 * @param message
 * @returns {*}
 */
export function updateData({name, qq, habit, userAvatar, message,}) {
    //用户更新
    return axios.put("/account/user", {
        name,
        qq,
        habit,
        userAvatar,
        message
    }, {auth: true})
}


/**
 * 重新审核
 * @param uid
 * @returns {*}
 * @constructor
 */
export function ReCheck(uid) {

    return axios.put("/account/recommend", {uid}, {auth: true,}
    )
}

/**
 * 删除推荐未通过的
 * @param uid
 * @returns {*}
 * @constructor
 */
export function DeleteRecommend(uid) {
    return axios.delete(`/account/recommend`, {
        data: {
            uid
        },
        auth: true
    })
}


/**
 * 获取推荐过的列表

 */
export function recommendList(page) {
    return axios.get('/account/recommend', {
        params: {
            page
        }
        , auth: true
    })
}

/**
 * 所有收藏
 * @returns {*}
 */
export function collectList() {
    return axios.get('/account/collect', {auth: true})
}


/**
 * 获取用户的说有通知
 * @returns {*}
 */
export function getInforms(picker) {
    return axios.post('/account/informs', {
        ...picker,
    }, {auth: true})

}

/**
 * 删除通知
 * @param pk
 * @param clear
 * @returns {*}
 */
export function deleteInforms(pk, clear) {
    return axios.delete('/account/informs', {
        data: {
            pk, clear
        },
        auth: true
    })
}

