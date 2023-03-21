<template>
  <div>
    <el-tabs v-model="currentTab" class="p-3 bg-cyan-50" @tab-click="handleTab">
      <el-tab-pane label="推荐" name="recommend">
      </el-tab-pane>
      <el-tab-pane label="热门" name="hot"></el-tab-pane>
      <el-tab-pane label="最新" name="latest"></el-tab-pane>
    </el-tabs>

    <div class="chats">
      <template v-for="chat in chats" :key="chat.id">
        <el-card class="bg-cyan-50" shadow="never" style="border: none;margin-bottom: 20px;">
          <char-card :chat="chat"/>
          <el-row class="mt-15">
            <comment-area/>
          </el-row>
        </el-card>
      </template>
    </div>

  </div>
</template>

<script>
import {mapState} from "vuex";
import {ChatLineRound, Pointer, WarnTriangleFilled} from '@element-plus/icons-vue'

import CommentArea from "@/components/modules/comment/commentArea.vue";
import CharCard from "@/components/modules/comment/charCard.vue";


export default {
  name: "chatGroup",
  components: {
    CharCard,
    CommentArea,
    ChatLineRound, Pointer, WarnTriangleFilled
  },
  data() {
    return {
      currentTab: 'recommend'
    }
  },
  mounted() {
    this.$store.dispatch('chatAsync')

  },
  methods: {
    handleTab(tab) {
      console.log(tab)
    },

  },
  computed: {
    ...mapState({
      chats: state => state.Hall.chats
    }),
  }
}
</script>

