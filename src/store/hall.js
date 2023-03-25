import {getRank, getChatList, getCircleList, getStimulateGoods, getOrders} from "@/apis/hall";


export default {
    state: {
        hallSelect: [],
        ranks: [], //排名数据,
        chats: [],
        commentList: [],
        replayUser: {
            replayId: null,
            replayName: null
        },
        //圈子
        circleList: [],
        //商品
        goods: [],
        //订单
        orders: []
    },
    mutations: {
        setHallSelect(state, hallSelect) {
            state.hallSelect = hallSelect
        },
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
        setCircle(state, circleList) {
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
        setStimulate(state, goods) {
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
        },
        /**
         * 保存订单信息
         * @param state
         * @param orders
         */
        setOrder(state, orders) {
            state.orders = orders
        },
        /**
         * 添加订单
         * @param state
         * @param order
         */
        addOrder(state, order) {
            state.orders.push(order)
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
        /**
         * 获取聊天记录
         * @param commit
         * @param state
         */
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
        /**
         * 获取圈子的人
         * @param commit
         * @param state
         */
        circleListAsync({commit, state}) {
            if (state.circleList.length === 0) {
                getCircleList().then(res => {
                    commit('setCircle', res.data)
                })
            }
        },
        /**
         * 获取所有商品
         * @param commit
         * @param state
         */
        stimulateGoodsAsync({commit, state}) {
            if (state.circleList.length === 0) {
                getStimulateGoods().then(res => {
                    commit('setStimulate', res.data)
                })
            }
        },
        orderAsync({commit, state}) {
            if (state.orders.length === 0) {
                getOrders().then(res => {

                    commit('setOrder', res.data)
                })
            }
        }
    },

}