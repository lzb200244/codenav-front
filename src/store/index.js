import {createStore} from 'vuex'
import {recommendList, getInfo, getInforms} from "@/apis/account";
import {getAllSelect,getContent} from "@/apis/operation";
import {getRank} from "@/apis/hall";
import message, {Notification} from '@/utils/messager';
import {remove_token, get_token} from "@/utils/cookies";
import router from "@/router";


// 创建一个新的 store 实例
const mutations = {
    setPageCount(state, pageCount) {
        state.pageCount = pageCount
    },
    setRecommendTotalCount(state, total) {
        state.recommendsTotalCount = total //存储总共数量
    },
    setAllSelect(state, data) {
        state.allSelect = data
    },
    /**
     * 保存用户信息
     * @param state
     * @param data
     */
    saveUser(state, data) {
        state.user = data
    },
    setHitCount(state, count) {
        state.hitCount = count
    },
    clearHitCount(state, clearAll) {
        clearAll ? state.hitCount = 0 : state.hitCount--
    },
    /**
     * 删除用户数据
     * */
    deleteUserData(state) {
        state.user = ''
        // localStorage.setItem('UserData', {status: 0})
    },
    setRecommend(state, recommendList) {
        /**
         *存储用户过推荐的数据列表
         */
        state.recommends = recommendList
    },
    setMoreRecommend(state, moreRecommend) {

        state.recommends.push(...moreRecommend)
    },
    setCollect(state, collectList) {
        /**
         * 存储用户过收藏的数据列表
         */
        state.collects = collectList
    },
    /**
     * 加入更多收藏
     * @param state
     * @param moreCollect
     */
    setMoreCollect(state, moreCollect) {
        state.collects.push(...moreCollect)
    },
    setInform(state, Informs) {
        state.Informs = Informs

    },
    /**
     * 煤业数据

     */
    setPageList(state, pageList) {
        state.pageList = pageList
    },
    /**
     * 保存总排名
     * @param state
     * @param ranks
     */
    setRank(state, ranks) {
        state.ranks = ranks
    }

}
const getters = {}


const actions = {
    informsAsync({commit, state}) {
        if (state.recommends?.length === 0) {
            getInforms({type: 1, picker: new Date().toLocaleDateString()}).then(res => {
                commit('setInform', Object.freeze(res.data))
            })
        }
    },
    recommendAsync({commit, state}) {
        /**
         * 用户过的推荐
         */
        if (state.recommends?.length === 0) {

            recommendList(1).then(res => { //默认请求第一页
                console.log(res.data, 234)
                commit('setRecommend', res.data.results)
                commit('setRecommendTotalCount', res.data.count)
            })
        }
    },
    collectAsync({commit, state}) {
        /**
         * 用户收藏
         */
        if (state.collects.length === 0) {
            getContent('收藏', 1).then(res => {
                commit('setCollect', res.data.results)
                commit('setPageCount', res.data.count)
            })
        }
    },
    userAsync({commit, state}) {
        if (state.user === '') {
            getInfo().then(res => {
                const token = get_token();

                // res = res.data;
                if (res) {
                    if (!res.data.isLogin) {
                        //每日登录提示
                        Notification(`尊贵的${res.data.username},💴积分+1 <br/>${new Date().toLocaleString()}`, `欢迎回来!😀`, 'success');
                    }
                    if (res.data.isvalid !== token) {
                        message('检测到多客户端登入!', 'info');
                        //防止多客户端登入
                        commit('deleteUserData');
                        //删除token
                        remove_token();
                        //删除浏览器存储
                        localStorage.removeItem('UserData');
                        return router.push({path: '/login'})
                    }
                }

                commit('saveUser', res.data)
                commit('setHitCount', res.data.hitCount)
            })
        }
    },
    /**
     * 存储煤业信息
     * @param commit
     * @param state
     */
    pageAsync({commit, state}) {
        let search = router.currentRoute.value.query.search
        if (search) {
            getContent(undefined, undefined, undefined, search).then(res => {
                commit('setPageList', res.data.results)
                commit('setPageCount', res.data.count)
            })
        } else {
            if (state.pageList === null) {
                getContent().then(res => {
                    //存储页数
                    commit('setPageList', res.data.results)
                    commit('setPageCount', res.data.count)
                })
            }
        }


    },
    /**
     *
     */
    selectAsync({commit, state}) {
        if (state.allSelect === null)
            getAllSelect().then(res => {
                commit('setAllSelect', Object.freeze(res.data))
            })
    },
    rankAsync({commit, state}) {
        if (state.ranks.length === 0) {
            getRank().then(res => {
                commit('setRank', Object.freeze(res.data))
            })
        }
    }
}
const store = createStore({
    state() {
        return {
            //用户信息
            user: '',
            //数据
            pageList: null,
            pageCount: 0,
            //通知未读数量
            hitCount: 0,
            recommends: [], //我推荐的网站
            recommendsTotalCount: 0, //总共数据
            allSelect: null,
            Informs: [], //用户通知
            collects: [], //我收藏的网站
            ranks: []

        }
    },
    mutations,
    getters,
    actions,
})

export default store

