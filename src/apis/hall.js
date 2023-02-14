import instance, {request} from "@/axios";


// instance.defaults.baseURL = 'https://api.example.com';
// console.log(request('hall'))
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
