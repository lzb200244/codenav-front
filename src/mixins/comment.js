import {handleRemark} from "@/apis/hall";
export default {
    data() {
        return {
            commentObj: {
                content: '',
                replay_id: null,
            }
        }
    },
    methods: {
        remark(id) {
            this.commentObj.replay_id=id
            console.log(this.commentObj)
            handleRemark(this.commentObj).then(res => {
                console.log(res)
            })
            this.commentObj.content = ''
        }
    }
}