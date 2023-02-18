import axios from "@/axios";

/**
 * 获取网站日程
 * @returns {*}
 */
export function getNews() {
    return axios.get('/operation/news')
}

/**
 * 取消与收藏
 * @param uid
 * @param status 是否收藏
 * @returns {*}
 */
export function markStarPost(uid, status) {
    //收藏取消
    return axios.put(`/operation/opt`, {
        uid,
        status,
    })
}

/**
 * 爬取图片
 * @param spider_url url地址
 * @returns {*}
 */
export function spider(spider_url = "") {
    return axios.get("/operation/spider", {
            params: {//请求参数
                spider_url
            }
        }
    )

}

/**
 * 获取单页面详细
 * @param uid uid
 * @returns {*}
 */
export function getSiteDetail(uid) {
    return axios.get('/operation/detail', {
            params: {
                uid
            }
        }
    )

}

/**
 *
 * @param reply_site 评论网站uid
 * @param content 内容
 * @param parentId 是否是回复回复的父id
 * @returns {*}
 * @constructor
 */
export function Reply(reply_site, content, parentId = undefined) {
    return axios.post(`/operation/comment`, {
        reply_site,
        content,
        parentId,
    })
}

/**
 * 获取所有评论
 * @param uid
 * @returns {*}
 */
export function getAllComment(uid) {

    return axios.get(`/operation/comment`, {
        params: {
            uid
        }
    })
}

/**
 * 点赞与评分
 * @param id 评分者
 * @param status 是否已经评分
 * @param uid 评分对象
 * @param value 数值
 * @returns {*}
 * @constructor
 */
export function Option(id, status, uid, value) {

    return axios.post(`/operation/opt`, {
        id, status, uid, value
    });

}

/**
 * 发送邮箱
 * @param email:邮箱号
 * @returns {*}
 */
export function sendEmailCode({loginemail}) {
    return axios.post("/operation/email", {
        email: loginemail
    })
}

/**
 * 获取分页
 * @param ordering 排序
 * @param page 页
 * @param filter 过滤条件
 * @param search 搜索
 * @returns
 */
export function getContent(ordering = 'hot', page = 1, filter, search) {
    return axios.post("/operation/pages", {
            ordering,
            page,
            search,
            filter
        }
    )
}

/**
 * 所有选择项
 * @returns {*}
 */
export function getAllSelect() {
    return axios.get('/operation/all_select')

}
export function getBillBoard(){
    return axios.get('/operation/board')
}