<template>
  <el-main class="min-h-screen bg-light-600 ">
    <el-row><span class="text-xl mb-10 ml-2 text-gray-500"> {{ text }}</span></el-row>
    <el-row class="min-h-45 max-h-60  mb-5 ">
      <el-col class="min-h-20 max-h-60 mb-0 p-8 mt-5  " style="background:#ffffff;position: relative">
        <el-from style="position: relative" label-width="120px">
          <el-form-item>
            <template #label>
              <span class="iconfont pr-4">&#xe651;</span>
              搜 索
            </template>
            <my-select @transfer="handleEvent"/>
          </el-form-item>
          <el-form-item>
            <template #label>
              <span class="iconfont pr-4">&#xe604;</span>
              筛 选
            </template>
            <div class="flex justify-space-between mb-1 flex-wrap gap-4">
              <el-radio-group v-model="order" @change="orderingOpt">
                <el-radio-button label="热门"/>
                <el-radio-button label="时间"/>
                <el-radio-button label="评分"/>
                <el-radio-button label="收藏"/>
              </el-radio-group>
            </div>
          </el-form-item>
        </el-from>
      </el-col>
    </el-row>
    <template v-if="pageList===null">
      <el-empty description="暂时未搜索到资源"
                image-size="200">
        <el-row>
          <el-button type="primary" @click="$router.push('/source')">
            重写搜索
          </el-button>
          <el-button type="primary" @click="$router.push('/account/recommend')">
            我要推荐
          </el-button>
        </el-row>
      </el-empty>
    </template>
    <template v-else>
      <el-row class=" ">
        <el-col :span="24">
          <el-row :gutter="10">
            <keep-alive>
              <card v-show="pageList!==null" :SiteData="pageList" :Loading="false"/>
            </keep-alive>
          </el-row>
        </el-col>
        <el-backtop :bottom="100">
          <div class="backtop">
            <span class="iconfont"> &#xe607; </span>
          </div>
        </el-backtop>
      </el-row>
    </template>
    <el-footer class="flex items-center  justify-end my-5">
      <el-pagination
          :page-size="9"
          :total="pageCount"
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          background/>
    </el-footer>

  </el-main>
</template>
<script>
import Card from '/src/components/modules/card.vue';
import mySelect from '/src/components/modules/select.vue';
import {getContent} from '@/apis/operation';
import require_auth from '@/mixins/require_auth'
import {mapState} from "vuex";
// import bs4 from "@/utils/encrypt"

export default {
  mounted() {
    this.$store.dispatch('pageAsync')
  },
  data() {
    return {
      filterList: undefined,
      order: '热门', //筛选排序顺序
      currentRoute: this.$router.currentRoute,
      currentPage: 1, //当前页
      SelectList: [],
    }
  },
  props: {
    //获取父传来的值
    text: { //当前页面的标栏变化
      type: String, default: '编程语言'
    }
  },
  mixins: [require_auth],
  components: {
    Card, mySelect
  },
  watch: {
    /**
     *侧边栏请求
     */
    currentRoute(value) {
      getContent(this.order, this.page, this.filterList).then(res => {
        // this.$store.commit('setPageList', res)
      })
    },
  },
  computed: {
    ...mapState({

      pageCount: state => state.Operation.pageCount,
      pageList: state => state.Operation.pageList
    }),
  },
  methods: {
    /**
     * 标签筛选
     *
     * */
    handleEvent(filterList) {
      filterList = Object.values(filterList);
      if (this.loginRequire) return;
      this.currentPage = 1 //显示第一页
      getContent(this.order, this.currentPage, filterList).then(res => {
        this.$store.commit('setPageCount', res.data.count)
        this.$store.commit('setPageList', res.data.results)

        this.filterList = filterList
      })
    },
    /**
     * 排序方式
     * */
    orderingOpt(order) {
      if (order === '收藏' && this.loginRequire) return
      this.currentPage = 1
      getContent(order, this.currentPage, this.filterList).then(res => {
        this.$store.commit('setPageCount', res.data.count)
        this.$store.commit('setPageList', res.data.results)
      })
      this.order = order
    },

    /**
     * 请求其他页
     * @param page
     */
    handleCurrentChange(page) {
      if (this.loginRequire) return;
      getContent(this.order, page, this.filterList).then(res => {
        this.$store.commit('setPageCount', res.data.count)
        this.$store.commit('setPageList', res.data.results)

        this.currentPage = page;
      })
    }
  },


}


//加载骨架


</script>

