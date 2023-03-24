
import {getAllSelect, getContent, getBillBoard} from "@/apis/operation";
import router from "@/router";
export default {
    state: {
        pageList: null,
        pageCount: 0,
        //通知未读数量
        allSelect: null,
        collects: [], //我收藏的网站
        billboard: {
            author: null,
            board: null
        }
    },
    mutations: {
        /**
         * 总共个数
         * @param state
         * @param pageCount
         */
        setPageCount(state, pageCount) {
            state.pageCount = pageCount
        },
        /**
         * 存储站内用到的所有选项
         * @param state
         * @param data
         */
        setAllSelect(state, data) {
            state.allSelect = data
        },
        /**
         * 用户收藏
         * @param state
         * @param collectList
         */
        setCollect(state, collectList) {
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
        popCollect(state,index){
            state.collects.splice(index, 1)
        },
        /**
         * 煤业数据

         */
        setPageList(state, pageList) {
            state.pageList = pageList
        },
    },
    actions: {
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
        /**
         * 告示栏
         * @param commit
         * @param state
         */
        billboardAsync({commit, state}) {
            getBillBoard().then(res => {
                state.billboard = res.data
            })
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
         * 获取所有站内选项
         * @param commit
         * @param state
         */
        selectAsync({commit, state}) {
            if (state.allSelect === null)
                getAllSelect().then(res => {
                    commit('setAllSelect', Object.freeze(res.data))
                })
        },
    },

}