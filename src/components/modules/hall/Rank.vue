<template>
  <div class="min-h-80">
    <template v-if="ranks.length!==0">
      <el-row v-for="(item,index) in ranks" style="margin: 30px 0px;" :key="item.name">
        <el-col style="display: flex;position: relative;align-items: center">
          <div style="margin:0 15px;font-weight: bolder">{{ index + 1 }}</div>
          <div>
            <avatar :avatar="item.avata??'key'" :username="item.name"></avatar>

          </div>
          <div style="margin-left: 10px;">{{ item.name }}</div>
          <div style="position: absolute;right: 5%">
            <span><el-tag> 积分 </el-tag> {{ item.score }}</span>
          </div>
        </el-col>
      </el-row>

    </template>
    <template v-else>
      <el-empty description="本次排行未统计"/>
    </template>
  </div>
</template>

<script>

import avatar from "@/components/modules/account/avatar.vue";

/**
 * 排行榜
 */
export default {
  name: "Rank",
  components: {
    avatar
  },
  props: {
    ranks: {
      type: Array,
      default: []
    }
  },

}
</script>

<style scoped>

</style>
