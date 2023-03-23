import {handleRemark, getChatList} from "@/apis/hall";


export default {
    data() {
        return {
            commentObj: {
                content: '',
                replay_id: null,
                issue_type: 1
            },

        }
    },
    methods: {
        /**
         * 发送评论mixin
         * @param replay_id
         */
        remark(replay_id = null) {
            this.commentObj.replay_id = replay_id
            //空
            let that = this
            if (this.commentObj.content !== '<p><br></p>') {
                handleRemark(this.commentObj).then(res => {
                    //    回复成功
                    const {id, user} = res.data
                    const comment = {
                        id,
                        ...that.commentObj,
                        like: 0,
                        // title: null,
                        replay: null,
                        create_time: new Date().toLocaleString().replaceAll("/", '-'),
                        user
                    }
                    //回复
                    if (replay_id === null) {
                        that.$store.commit('addChat', comment)
                    } else {
                        Object.assign(comment, {replays: []})
                        that.$store.commit('addComment', comment)
                    }
                    that.commentObj.content = ''
                })
            }

        },
        handleFilterChat(filterObj) {
            getChatList(filterObj).then(res => {
                this.$store.commit('setChat', res.data)
            })
        }
    }
}