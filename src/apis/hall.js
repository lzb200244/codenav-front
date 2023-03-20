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

export function getChatList() {
    return instance.get("/hall/chat")
}

export function handleTrump({id, status}) {
    return instance.put("/hall/chat", {

        id, status

    })
}