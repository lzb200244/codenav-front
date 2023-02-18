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
              <bill-board :config="billboard.board"/>
              <bill-board :config="billboard.author"/>
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
import BillBoard from "@/components/modules/BillBoard.vue";
import {getContent} from "@/apis/operation";
import {mapState} from "vuex";


export default {
  components: {
    card, Rank, BillBoard
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
      filterList: [], //筛选选项
      config: {
        title: '超级爬',
        link: 'https://github.com/lzb200244/spider-pro.git',
        img: '超级爬',
        shape: 'square',
        introduce: '一个只需要URL,爬光所有网站你需要的消息,表格,文章,图片,可视化',
      },
      infoConfig: {
        title: '关于我',
        link: '',
        img: '/siteico.png',
        shape: 'circle',
        introduce: '一个慢慢来的人,使劲的卷,我爱吃鸡蛋卷,.....',
      }
    }
  },
  mounted() {
    //获取数据axios
    this.$store.dispatch('pageAsync')
    this.$store.dispatch('billboardAsync')
    //获取全部排行
    this.$store.dispatch('rankAsync')

  },
  computed: {
    ...mapState({
          ranks: state => state.Hall.ranks,
          pageList: state => state.Operation.pageList,
          billboard: state => state.Operation.billboard
        }
    ),
    selectList() {
      let user = this.$store.state.Account.user
      if (user !== '' && user.detail?.habit.length !== 0) {
        return user.detail.habit
      }
      return this.$store.state?.Operation.allSelect?.selectList
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
