import {getRank, getChatList, getCircleList, getStimulateGoods} from "@/apis/hall";


export default {
    state: {
        ranks: [], //排名数据,
        chats: [],
        commentList: [],
        replayUser: {
            replayId: null,
            replayName: null
        },
        circleList: [],
        goods: []
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
        setCircleList(state, circleList) {
            state.circleList = circleList
        },
        setCommentList(state, commentList) {
            state.commentList = commentList
        },
        addComment(state, comment) {
            state.commentList.replays.push(comment)
        },
        /**
         * 保存问答
         * @param state
         * @param chats
         */
        setChat(state, chats) {
            state.chats = chats
        },
        setStimulateGoods(state, goods) {
            state.goods = goods
        },
        /**
         * 减少库存
         * @param state
         * @param goodId 商品id
         * @param count 数量
         */
        subStimulateGoodsStore(state, goodId, count = 1) {
            state.goods.forEach(
                item => {
                    if (item.id === goodId) {
                        item.store -= count
                    }
                }
            )
        },
        addChat(state, chat) {
            console.log(state.chats)
            state.chats.push(chat)
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
                    commit('setChat', res.data)
                })
            }

        },
        circleListAsync({commit, state}) {
            if (state.circleList.length === 0) {
                getCircleList().then(res => {
                    commit('setCircleList', res.data)
                })
            }
        },
        stimulateGoodsAsync({commit, state}) {
            if (state.circleList.length === 0) {
                getStimulateGoods().then(res => {
                    commit('setStimulateGoods', res.data)
                })
            }
        }
    },

}