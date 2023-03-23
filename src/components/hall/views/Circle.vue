<template>
  <div class="bg-cyan-50">
    <el-tabs v-model="currentTab" class="p-3 bg-cyan-50" @tab-click="handleTab">
      <el-tab-pane label="推荐" name="recommend">
        <el-row>
          <template v-for="user in circleList">

              <user-card style="border: 1px solid rgba(228,231,237,0.86)" :user-obj="user"/>
          </template>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="热门" name="hot"></el-tab-pane>
      <el-tab-pane label="最新" name="latest"></el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import {mapState} from "vuex";
import userCard from "@/components/modules/account/userCard.vue";

/**
 * 社交圈
 */
export default {
  name: "Circle",
  components: {
    userCard,
  },
  data() {
    return {
      currentTab: 'recommend'
    }
  },
  mounted() {
    this.$store.dispatch('circleListAsync')
  },
  methods: {},
  computed: {
    ...mapState({
      circleList: state => state.Hall.circleList,
    }),

  }
}
</script>

<style scoped>

</style>