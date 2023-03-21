import instance from "@/axios";


/**
 * 获取周排名
 */
export function getRank(week, tp) {
    return instance.post('/hall/rank', {
        week,
        tp
    })
}

/**
 * 我的排名
 * @param tp
 * @returns {*}
 */
export function myRank(tp) {
    return instance.get('/hall/rank', {
        tp
    })
}

export function getChatList(id) {
    return instance.get("/hall/chat", {
        params: {
            id
        }
    })
}

export function handleTrump({id, status}) {
    return instance.put("/hall/chat", {
        id, status
    })
}

export function handleRemark({replay_id, content}) {
    return instance.post("/hall/chat", {
        replay_id, content
    })
}