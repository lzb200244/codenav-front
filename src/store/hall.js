import {getRank} from "@/apis/hall";

export default {
    state: {
        ranks: [], //排名数据
    },
    mutations: {
        /**
         * 保存总排名
         * @param state
         * @param ranks
         */
        setRank(state, ranks) {
            state.ranks = ranks
        }
    },
    actions: {
        /**
         * 获取排名
         * @param commit
         * @param state
         */
        rankAsync({commit, state}) {
            if (state.ranks.length === 0) {
                getRank().then(res => {
                    commit('setRank', Object.freeze(res.data))
                })
            }
        }
    },

}