<template>
  <transition-group name="mytranslate">
    <el-row :gutter="10"
            v-for="item in SiteData" :key="item.uid"
            class="px-2 py-1  flex bg-light-50 ">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" :push="1">
        <el-avatar class="bg-light-50" shape="square" :size="50" :src="item.img_url">
          <img src="/siteico.png"/>
        </el-avatar>
      </el-col>
      <el-col :xs="0" :sm="6" :md="8" :lg="9" :xl="11">
        <div class="mt-4 font-500">
          {{ item.name }}
        </div>
      </el-col>
      <el-col :xs="0" :sm="6" :md="8" :lg="9" :xl="11">
        <div class="mt-5 text-sm  opacity-60 truncate">
          {{ item.introduce }}
        </div>
      </el-col>
      <template v-if="isType==='collect'">
        <el-col :xs="10" :sm="6" :md="4" :lg="3" :xl="1">
          <div class="mt-3  ">
            <el-button type="text" @click="toSite(item.site_url)" class="ico">
              <span class="iconfont">&#xe6d6;</span>
            </el-button>

            <el-button text class="ico" @click="clickStarUnstar(item.uid,true)"
                       style="color: gold">
              <span class="iconfont">&#xe849;</span>
            </el-button>
          </div>
        </el-col>
      </template>
      <template v-else>
        <el-col :xs="10" :sm="6" :md="4" :lg="3" :xl="1">
          <div class="mt-3 ">
            <el-button v-if="item.isvalid==='审核中'" loading type="primary" text>
              {{ item.isvalid }}
            </el-button>
            <el-button v-else-if="item.isvalid==='通过审核'" type="success" text icon="SuccessFilled">
              {{ item.isvalid }}
            </el-button>
            <el-button-group v-else>
              <el-button @click="reCheck(item.uid)" type="danger" text>
                <span class="iconfont">&#xe633;</span>
                未通过
              </el-button>
              <el-popconfirm title="是否确认删除?" @confirm="deleteRecommend(item.uid)">
                <template #reference>
                  <el-button type="danger" text>
                    <span class="iconfont">&#xe718;</span>
                  </el-button>
                </template>
              </el-popconfirm>
            </el-button-group>
          </div>
        </el-col>
      </template>
      <el-divider class="m-2">
      </el-divider>
    </el-row>
    <el-button @click="moreCollect" v-loading="loading" :disabled="disabled">{{ text }}</el-button>
  </transition-group>
</template>

<script>
import {Notification} from '@/utils/messager';
import {DeleteRecommend, ReCheck, recommendList} from '@/apis/account';
import { getContent} from '@/apis/operation';
import site_option from "@/mixins/site_option";


/*
* todo 列表组件
*
* */
export default {
  name: 'list',
  mixins: [site_option],
  props: {
    SiteData: {
      type: Array,
      default: []
    },

    isType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      page: 1,
      disabled: false,
      loading: false,
      text: '加载更多'
    }
  },
  methods: {
    moreCollect() {
      /**
       * 是否请求大于库存页数
       * */
      this.loading = true
      switch (this.isType) {
        case 'collect': {
          if (this.page * 9 < this.$store.state.Operation.pageCount) {
            getContent('收藏', ++this.page).then(res => {
              this.loading = false
              this.$store.commit('setMoreCollect', res.data.results)
              this.$store.commit('setPageCount', res.data.count)
            })
          } else {
            /**
             * 大于
             */
            this.disabled = true;
            this.text = '已经没有更多收藏了'
          }
          break
        }
        default: {
          if (this.page * 9 < this.$store.state.Operation.recommendsTotalCount) {
            recommendList(++this.page).then(res => { //默认请求第一页
              this.$store.commit('setMoreRecommend', res.data.results)
              this.$store.commit('setRecommendTotalCount', res.data.count)
            })
          } else {
            /**
             * 大于
             */
            this.disabled = true;
            this.text = '已经没有更多推荐了'
          }

        }
          break
      }
      this.loading = false

    },
    /**
     * 重新审核用户推荐信息
     * */
    reCheck(uid) {
      ReCheck(uid).then((response) => {
        Notification('已发起审核', "", 'info')
        let lst = []
        for (let i = 0; i < this.SiteData.length; i++) {
          let item = this.SiteData[i]
          if (item.uid === uid) item.isvalid = '审核中';
          lst.push(item)
        }
        this.$store.commit('setRecommend', lst)
      });
    },
    /**
     * 删除自己推荐的项目
     * @param pk 外间
     */
    deleteRecommend(uid) {
      DeleteRecommend(uid).then(() => {
            Notification('删除成功', "", 'warring')
            /**
             * 更新store
             */
            this.$store.commit('setRecommend',
                this.SiteData.filter(item => item.uid !== uid))
          }
      );
    },
    //取消收藏

  }
  ,
}
</script>

<style scoped>
.mytranslate-leave-active {
  animation: translate 0.3s reverse;
}

.mytranslate-enter-active {
  animation: translate 0.3s;
}

@keyframes translate {
  0% {
    opacity: 0;
    transform: translateX(50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
</style>
