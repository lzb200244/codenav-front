<template>
  <div class="bg-cyan-50">
    <el-tabs v-model="currentTab" class="p-3 bg-cyan-50" @tab-click="handleTab">
      <el-tab-pane label="推荐关注" name="recommend">
      </el-tab-pane>
      <el-tab-pane label="共同关注" name="common"></el-tab-pane>
      <el-tab-pane label="都在关注" name="pop"></el-tab-pane>

    </el-tabs>

    <template v-if="circleList.length!==0">
      <el-row>
        <template v-for="user in circleList">
          <user-card style="border: 1px solid rgba(228,231,237,0.86)" :user-obj="user"/>
        </template>
      </el-row>
    </template>
    <template v-else>
      <el-empty description="没有发现跟多关注者"/>
    </template>

  </div>
</template>

<script>
import {mapState} from "vuex";
import userCard from "@/components/modules/account/userCard.vue";
import {getCircleList} from "../../../apis/hall";

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
  methods: {
    handleTab(value) {
      getCircleList({type: value.props.name}).then(res => {
        // console.log(this === that)
        this.$store.commit('setCircleList', res.data)
      })
    }
  },
  computed: {
    ...mapState({
      circleList: state => state.Hall.circleList,
    }),

  }
}
</script>

<style scoped>

</style>