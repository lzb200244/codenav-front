<template>
  <div class="common-layout">
    <el-container>
      <el-main class="p-2" style="overflow-y: hidden">
        <el-row :gutter="10" class="p-3 bg-light-50  " style="margin-right: 0;margin-left: 0;">
          <p class="collect">
            收藏
          </p>
          <el-divider class="mt-0"/>
          <el-input class="mb-8" v-model.lazy="search" placeholder="支持远程搜索~~~"/>
        </el-row>
        <template v-if="filterData.length===0">
          <el-empty description="没有收藏~~~">
            <el-button type="primary" class="ml-4" @click="$router.push('/index')">
              前往收藏
            </el-button>
          </el-empty>
        </template>
        <template v-else>
          <el-scrollbar height="500px">
            <list :SiteData="filterData"
                  isType="collect">
            </list>
          </el-scrollbar>
        </template>
      </el-main>
    </el-container>
  </div>

</template>

<script>
import list from '@/components/modules/list.vue'

export default {
  name: 'Collect',
  components: {
    list
  },
  data() {
    return {
      search: '',
    }
  },
  mounted() {
    this.$store.dispatch('collectAsync')

  },
  computed: {
    //搜索过滤
    filterData() {
      let collects = this.$store.state.Operation.collects
      if (collects.length === 0) {
        /**
         * 没有收藏
         * */
        return collects
      }
      return collects.filter(item => item.name.includes(this.search));
    }
  },
}

</script>

<style>
.ico {
  font-size: 20px !important;
}

.collect {
  height: 60px;
  line-height: 40px;
  font-size: 18px;
}


</style>


