import {recommendList, getInfo, getInforms} from "@/apis/account";
import message, {Notification} from '@/utils/messager';
import {remove_token, get_token} from "@/utils/cookies";

export default {
    state: {
        user: '',
        recommends: [], //我推荐的网站
        recommendsTotalCount: 0, //总共数据
        Informs: [],
        hitCount: 0,
        //关注列表
        follows: []
    },
    mutations: {
        /***
         * 关注列表
         * @param state
         * @param setFollows
         */
        setFollows(state, setFollows) {
            state.follows = setFollows
        },
        /**
         * 取关
         * @param state
         * @param followID
         */
        popFollows(state, followID) {
            state.follows.splice(state.follows.indexOf(followID), 1)
        },
        /**
         * 关注
         * @param state
         * @param followID
         */
        addFollows(state, followID) {
            state.follows.push(followID)
        },
        setInform(state, Informs) {
            state.Informs = Informs
        },
        /**
         *存储用户过推荐的数据列表
         */
        setRecommend(state, recommendList) {
            state.recommends = recommendList
        },
        setMoreRecommend(state, moreRecommend) {
            state.recommends.push(...moreRecommend)
        },
        /**
         * 存储页数
         * @param state
         * @param total
         */
        setRecommendTotalCount(state, total) {
            state.recommendsTotalCount = total //存储总共数量
        },
        /**
         * 存储用户详细
         * @param state
         * @param data
         */
        saveUser(state, data) {
            state.user = data
        },
        /**
         * 是否有通知
         * @param state
         * @param count
         */
        setHitCount(state, count) {
            state.hitCount = count
        },
        clearHitCount(state, clearAll) {
            clearAll ? state.hitCount = 0 : state.hitCount--
        },
        deleteUserData(state) {
            state.user = ''

        },
    },
    actions: {
        informsAsync({commit, state}) {
            if (state.Informs?.length === 0) {
                getInforms({type: 1, picker: new Date().toLocaleDateString()}).then(res => {
                    commit('setInform', Object.freeze(res.data))
                })
            }
        },
        /**
         * 用户过的推荐
         */
        recommendAsync({commit, state}) {
            if (state.recommends?.length === 0) {
                recommendList(1).then(res => { //默认请求第一页
                    commit('setRecommend', res.data.results)
                    commit('setRecommendTotalCount', res.data.count)
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
                    //存储用户信息
                    commit('saveUser', res.data)
                    commit('setFollows', res.data.follows)
                    commit('setHitCount', res.data.hitCount)
                })
            }
        },
    },

}
