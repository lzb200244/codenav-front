import {getRank, getChatList} from "@/apis/hall";


export default {
    state: {
        ranks: [], //排名数据,
        chats: [],
        commentList: [],
        replayUser: {
            replayId: null,
            replayName: null
        }
    },
    mutations: {
        /**
         * 保存总排名
         * @param state
         * @param ranks
         */
        setRank(state, ranks) {
            state.ranks = ranks
        },
        setReplayUser(state, replayUser) {
            state.replayUser = replayUser
        },

        setCommentList(state, commentList) {
            state.commentList = commentList
        },
        /**
         * 保存聊天记录
         * @param state
         * @param chats
         */
        setChat(state, chats) {
            state.chats = chats
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
        },
        chatAsync({commit, state}) {
            if (
                state.chats.length === 0
            ) {
                //获取所有评论非子回复
                getChatList().then(res => {
                    commit('setChat', Object.freeze(res.data))
                })
            }

        }
    },

}