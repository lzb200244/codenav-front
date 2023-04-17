import {markStarPost} from "@/apis/operation";
import message, {Notification} from "@/utils/messager";

export default {
    methods: {
        /**
         * 取消与收藏
         * @param uid 外交
         * @param status 状态
         */
        clickStarUnstar(uid, status) {

            markStarPost(uid, status).then((res) => {
                let item = {}
                for (let i = 0; i < this.SiteData.length; i++) {
                    item = this.SiteData[i]
                    if (item.uid === uid) {
                        status ? item.collect_num-- : item.collect_num++
                        item.sitedatauser.star = !status;
                        break //找到就结束循环此时的item为对象
                    }
                }
                //todo 从收藏列表去除
                if (status) {
                    //找到收藏对应的选项
                    this.$store.state.Operation.collects.forEach(
                        (item, index) => {
                            if (item.uid === uid) {
                                this.$store.commit('popCollect', index) //进入收藏夹state里
                            }
                        }
                    )
                    message('取消收藏')
                } else {
                    this.$store.commit('setMoreCollect', [item]) //进入收藏夹state里
                    message('收藏成功')
                }
            })
        },
        toSite(url) {
            /**
             * 跳转网站
             */
            window.open(url, "_blank")
        },
        copyUrl(url) {
            //分享功能l
            let input = document.createElement("input"); // js创建一个input输入框
            input.value = `我在www.codeminer.cn发现了一个宝藏资源:${url}😄😂`; // 将需要复制的文本赋值到创建的input输入框中
            document.body.appendChild(input); // 将输入框暂时创建到实例里面
            input.select(); // 选中输入框中的内容
            document.execCommand("Copy"); // 执行复制操作
            document.body.removeChild(input); // 最后删除实例中临时创建的input输入框，完成复制操作
            Notification("内容已在剪贴板", "分享成功",)
        },
        toDetail(uid) {
            let routeUrl = this.$router.resolve({
                name: `detail`,
                params: {uid: uid}
            });
            window.open(routeUrl.href, '_blank');
        }

    }
}

