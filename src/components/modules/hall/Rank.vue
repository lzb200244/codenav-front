<template>
  <div>
    <el-row v-for="(item,index) in ranks" style="margin: 30px 0px;">
      <el-col style="display: flex;position: relative;align-items: center">
        <div style="margin:0 15px;font-weight: bolder">{{ index + 1 }}</div>
        <div>
          <el-avatar :src="item.avatar"></el-avatar>
        </div>
        <div style="margin-left: 10px;">{{ item.name }}</div>
        <div style="position: absolute;right: 5%">
          <span><el-tag> 积分 </el-tag> {{ item.score }}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>


/**
 * 排行榜
 */
export default {
  name: "Rank",
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
