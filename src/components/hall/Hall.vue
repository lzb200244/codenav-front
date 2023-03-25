<template>
  <div>
    <el-row style="max-width: 85%;margin: 0 auto;">
      <el-container>
        <el-row class="mt-6">
          <el-radio-group v-model="patch" size="large">
            <el-radio-button @click="$router.push('/hall/chat')" label="问 答"/>
            <el-radio-button @click="$router.push('/hall/rank')" label="排 行"/>
            <el-radio-button @click="$router.push('/hall/circle')" label="圈 子"/>
            <el-radio-button @click="$router.push('/hall/stimulate')" label="激 励"/>
            <el-radio-button @click="$router.push('/hall/order')" label="订 单"/>

          </el-radio-group>
        </el-row>
        <el-header style="height: 100px;display: flex;align-items: center"
                   class="my-5 bg-cyan-50 p-6 ">
          <el-row :gutter="10" style="width: 100%;">
            <el-col :xs="8" :sm="8">
              <el-form-item label="类型筛选">
                <el-select size="large" v-model="filterObj.type" clearable placeholder="Select">
                  <el-option
                      v-for="item in hallSelect"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="10" :sm="10">
              <el-form-item label="精确搜索">
                <el-input size="large" v-model="filterObj.title" placeholder="对当前条件进行搜索"/>
              </el-form-item>
            </el-col>
            <el-col :xs="6" :sm="6">
              <el-button class="float-right" @click="handleFilter" type="primary" size="large">操作</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-main class="my-5 p-0" style="overflow: hidden">
          <router-view :filterObj="filterObj"></router-view>
        </el-main>
      </el-container>
    </el-row>
  </div>
</template>

<script>
import comment from "@/mixins/comment";
import {mapState} from "vuex";
import {getBaseHall} from "@/apis/hall";

export default {
  name: "hall",
  mixins: [comment],
  mounted() {

  },
  data() {

    return {
      patch: '问 答',
      optArray: ['chat', 'rank', 'circle', 'stimulate', 'order'],
      // baseFunc: null,
      filterObj: {
        type: 1,
        order: 'recommend'
      },
    }
  },
  methods: {
    /**
     * 筛选过滤
     */
    handleFilter() {
      let path = this.$route.path
      for (const index in this.optArray) {
        if (path.includes(this.optArray[index])) {
          path = path.split('/')[2] ?? 'chat'
          console.log(path)
          getBaseHall({path: path, params: this.filterObj}).then(res => {
            this.$store.commit(`set${path.slice(0, 1).toUpperCase() + path.slice(1).toLowerCase()}`, res.data)
          })
          break
        }
      }
    },

    switchOptSelect(arr, path) {
      for (const index in arr) {
        if (path.includes(arr[index])) {
          this.$store.commit('setHallSelect', this.$store.state.Operation.allSelect?.HallSelect[arr[index]])
          break
        }
      }

    }

  },
  computed: {
    ...mapState({
      hallSelect: state => state.Hall.hallSelect,
    }),

  },
  watch: {
    /**
     * 根据路由切换选项
     */
    '$route.path':
        {
          handler: function (newVal, oldVal) {


            this.switchOptSelect(this.optArray, newVal)
          },
          immediate: true,
          deep: true
        }
  }

}
</script>

<style scoped>

</style>
