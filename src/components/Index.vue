<template>
  <div class="common-layout bg-light-600  ">
    <el-container style="background:#f0f2f5;">
      <el-backtop :bottom="100">
        <div class="backtop">
          <span class="iconfont"> &#xe607; </span>
        </div>
      </el-backtop>
      <el-col :span="24">
        <el-row :gutter="15">
          <el-col :xs="24" :sm="18" class="mb-6">
            <el-main class="  min-h-screen" style="overflow-x: hidden">
              <el-row style="background:#f0f2f5;position: relative">
                <el-col :span="20">
                  <el-scrollbar>
                    <div class="scrollbar-flex-content my-3">
                      <template v-for="item in  selectList" :key="item.label">
                        <el-button
                            size="large"
                            style="background:white;"
                            @click="clickOption(item)"
                            text
                            :class="btn===item.label ?'btn-active':''">
                          {{ item.label }}
                        </el-button>
                      </template>
                    </div>
                  </el-scrollbar>

                </el-col>
                <el-clo :span="4" style="display: flex;align-items: center;">
                  <el-button type="primary" size="small" style="position: absolute;left: 90%"
                             @click="this.$router.push('/account/person')">设置标签
                  </el-button>
                </el-clo>
              </el-row>
              <el-row>
                <el-col :span="24" class="bg-cyan-50 flex px-5">
                  <h2 class="py-5   text-xl font-bold">{{ order }}</h2>
                  <el-radio-group @change="orderOpt" size="large" v-model="order"
                                  style="margin-left: auto">
                    <el-radio-button label="热门" border/>
                    <el-radio-button label="时间"/>
                    <el-radio-button label="评分"/>
                  </el-radio-group>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24" style="background:#f0f2f5;">
                  <el-row :gutter="14">
                    <keep-alive>
                      <card v-show="pageList!==null" :SiteData="pageList" :Loading="false"/>
                    </keep-alive>
                  </el-row>
                </el-col>
              </el-row>
            </el-main>
          </el-col>
          <el-col :xs="0" :sm="6">
            <el-aside class=" min-h-screen  mt-6 " width="100%">
              <el-card shadow="never" style="border: 0" class="box-card my-4 mx-auto">
                <div class="text-center">
                  <p class="text-base mt-1  opacity-90">
                    激 励 语
                    <el-icon class="text-red-500">
                      <span class="iconfont"> &#xe618; </span>
                    </el-icon>
                  </p>
                  <el-scrollbar height="100px">
                    <p class=" text-gray-500 opacity-90 text-xs tracking-normal mt-2 max-h-25  text-indent: 1.5rem ">
                      回忆过去，满满的相思忘不了。朋友一生一起走，那些日子不再有，一句话，一辈子，一生情，一杯酒。有过伤，还有痛，还有你，还有我。
                    </p>
                  </el-scrollbar>
                </div>
              </el-card>
              <el-card shadow="never" style="border: 0" class="box-card my-4 ">
                <p style="line-height: 30px;height: 30px;opacity: 0.95">关于作者</p>
                <el-divider class=" mt-3"></el-divider>
                <el-row>
                  <el-col :span="5" :sm="0" :md="4">
                    <div class="block">
                      <el-avatar :size="40"
                                 src="https://defaultdata-1311013567.cos.ap-nanjing.myqcloud.com/p8.png"/>
                    </div>
                  </el-col>
                  <el-col :span="19" :sm="20" :md="20">
                    <el-scrollbar height="60px">
                      <p class="text-sm text-gray-500">
                        <code class="bg-blue-100 mx-1 rounded-md px-1">在校学生</code>,目前大2
                        一枚,热爱<code class="bg-blue-100 mx-1 px-1 rounded-md">python</code>,对技术的渴望,如有不足恳请联系作者~~~~
                      </p>
                    </el-scrollbar>
                  </el-col>
                </el-row>
              </el-card>
              <el-card shadow="never" style="border: 0" class="box-card my-2">
                本周排行
                <rank :ranks="ranks"/>
              </el-card>
            </el-aside>
          </el-col>
          <el-button @click="$router.push('/source')"
                     style="margin: 0 auto;" type="primary">
            点击查看更多<span class="iconfont">&#xe6d6;</span>
          </el-button>
        </el-row>
      </el-col>
    </el-container>
  </div>
</template>
<script>

import card from '@/components/modules/card.vue';
import Rank from '@/components/modules/rank.vue';
import {getContent} from "@/apis/operation";
import {mapState} from "vuex";

export default {
  components: {
    card, Rank
  },
  methods: {
    /**
     * 排序方式
     * @param order
     */
    orderOpt(order) {
      getContent(order, 1, this.filterList).then(res => {
        this.$store.commit('setPageList', res.data.results)
      })
      this.order = order
    },
    /**
     * 点击选项列表
     * @param item
     */
    clickOption(item) {
      if (item.label !== this.btn) {
        this.btn = item.label
        this.filterList = [item.value]
        getContent(this.order, 1, this.filterList).then(res => {
          this.$store.commit('setPageList', res.data.results)
          this.$store.commit('setPageCount', res.data.count)
        })
      }

    }
  },
  data() {
    return {
      order: '热门',
      btn: '',
      filterList: [] //筛选选项
    }
  },
  mounted() {
    //获取数据axios
    this.$store.dispatch('pageAsync')
    //获取全部排行
    this.$store.dispatch('rankAsync')

  },
  computed: {
    ...mapState(['pageList', 'ranks']),
    selectList() {
      let user = this.$store.state.user
      if (user !== '' && user.detail?.habit.length !== 0) {
        return user.detail.habit
      }
      return this.$store.state?.allSelect?.selectList
    },


  }


}


</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-tabs__nav-scroll {
  border: none;
}

.scrollbar-flex-content {
  display: flex;
}

button.el-button.el-button--large.is-text.btn-active {
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  color: #409eff;
}

.el-main > .el-row {
  background-color: #ffffff;
}

.demo-tabs {
  margin-bottom: -5px;
}
</style>
