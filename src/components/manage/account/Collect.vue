<template>
  <div class="common-layout">
    <el-container>
      <el-main class="p-2 " style="overflow-y: hidden">
        <el-row :gutter="10" class="px-3 bg-cyan-50  " style="margin-right: 0;margin-left: 0;">
          <p class="collect">
            收藏
          </p>
          <el-divider class="mt-0"/>
          <el-input class="mb-8" v-model.lazy="search" placeholder="支持远程搜索~~~"/>
        </el-row>
        <el-row class="mt-6">
          <el-scrollbar class="bg-cyan-50" height="500px" style="width: 100%">
            <template v-if="SiteData.length===0">
              <el-empty style="width: 100%" description="没有收藏~~~">
                <el-button type="primary" @click="$router.push('/index')">
                  前往收藏
                </el-button>
              </el-empty>
            </template>
            <template v-else>
              <template v-for="item in SiteData " :key="item.name">
                <lists
                    class="my-4"
                    :title="item.name"
                    :content="item.introduce"
                    :img-conf="{src:item.img_url,style: {height: '50px'}}">
                  <template #tag>
                    <spam></spam>
                  </template>
                  <template #opt>
                    <el-button type="text" @click="toSite(item.site_url)" class="ico">
                      <span class="iconfont">&#xe6d6;</span>
                    </el-button>
                    <el-button text class="ico" @click="clickStarUnstar(item.uid,true)"
                               style="color: gold">
                      <span class="iconfont">&#xe849;</span>
                    </el-button>
                  </template>
                </lists>
              </template>
            </template>
          </el-scrollbar>
        </el-row>

      </el-main>
    </el-container>
  </div>
</template>

<script>

import Lists from "@/components/modules/general/list.vue";
import site_option from "@/mixins/site_option";

export default {
  name: 'Collect',
  components: {
    Lists
  },
  mixins: [site_option],
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
    SiteData() {
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


