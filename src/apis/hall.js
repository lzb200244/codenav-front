import instance from "@/axios";


/**
 * 获取周排名
 */
export function getRank(week, tp) {
    return instance.post('/hall/rank', {
        week,
        tp,

    }, {auth: false})
}

/**
 * 我的排名
 * @param tp
 * @returns {*}
 */
export function myRank(tp) {
    return instance.get('/hall/rank', {
        tp,
        auth: true
    })
}

/**\
 *过滤筛选
 * @param id 单个聊天=>返回子聊天
 * @param issue_type 类型
 * @param opt 类型 对时间,热度,点赞
 * @param title 标题过滤
 * @returns {*}
 */
export function getChatList(chatFilter) {
    return instance.get("/hall/chat", {
        params: {
            ...chatFilter
        }, auth: true
    })
}

export function handleTrump({id, status}) {
    return instance.put("/hall/chat", {
        id, status,
    }, {auth: true})
}

export function handleRemark(replay) {
    return instance.post("/hall/chat", {
        ...replay

    }, {auth: true})
}

/**
 * 请求圈子
 * @param circleFilter
 *
 * @returns {*}
 */
export function getCircleList({type} = {}) {
    return instance.get('/hall/circle', {
        params: {
            type
        },
        auth: true
    })
}

/**
 * 跟谁
 * @param follow 跟随id
 * @param status 取关与关注
 * @returns {*}
 */
export function following({follow, status} = {}) {
    return instance.post('/hall/circle', {
        follow, status,

    }, {auth: true})
}

/**
 *获取商品列表
 * @returns {*}
 */
export function getStimulateGoods() {
    return instance.get('/hall/stimulate', {
        auth: true
    })
}

/**
 * 兑换物品
 * @param id 商品id
 * @param count 数量
 * @returns {*}
 */
export function buyGoods({id, count = 1} = {}) {
    return instance.post('/hall/stimulate', {id, count,}, {auth: true})
}

export function getOrders() {
    return instance.get('/hall/order', {auth: true})
}

export function getBaseHall({path, params} = {}) {
    return instance.get(`/hall/${path}`, {
        params,
        auth: true
    })
}