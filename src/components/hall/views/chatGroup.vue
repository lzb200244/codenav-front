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
          <el-row>
            <div>
              <template v-if="chat.avatar">
                <el-avatar :size="48" :src="chat.avatar">
                  {{ avatar }}
                </el-avatar>
              </template>
              <template v-else>
                <el-avatar :size="48">{{ chat.creator }}</el-avatar>
              </template>
            </div>
            <el-text :truncated="true" size="large" class="ml-5 mt-1"> {{ chat.creator }}</el-text>
            <el-tag class="ml-3 mt-1" type="success">{{ chat.score }}</el-tag>
          </el-row>
          <el-row class="h-25 my-5">
            <el-text size="large">
              {{ chat.content }}
            </el-text>
          </el-row>
          <el-row>
            <el-col :xs="6" :sm="4" :md="4"> {{ chat.create_time }}</el-col>
            <el-col :xs="3" :sm="3" :md="3">
              <el-icon @click="trumpClick(chat.id)">
                <Pointer/>
              </el-icon>
              <span>{{ chat.like }}</span>
            </el-col>
            <el-col :xs="3" :sm="3" :md="3">
              <el-icon>
                <ChatLineRound/>
              </el-icon>
            </el-col>
            <el-col :xs="3" :sm="3" :md="3">
              <el-icon>
                <WarnTriangleFilled/>
              </el-icon>
            </el-col>

          </el-row>
        </el-card>
      </template>
    </div>

  </div>
</template>

<script>
import {ChatLineRound, Pointer, WarnTriangleFilled} from '@element-plus/icons-vue'
import {mapState} from "vuex";
import {handleTrump} from "@/apis/hall";


export default {
  name: "chatGroup",
  components: {
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

    trumpClick(id) {
      const items = []
      for (let i = 0; i < this.chats.length; i++) {
        if (this.chats[i].id === id) {
          this.chats[i].like += 1
        }
        items.push(this.chats[i])
      }

      this.$store.commit('setChat',items)
      // this.$store.state.Hall.chats.forEach(item => {
      //   if (item.id === id) {
      //     item.like += 1
      //   }
      // })
    }
  },
  computed: {
    ...mapState({
      chats: state => state.Hall.chats
    }),
  }
}
</script>

<style scoped>
.el-icon {
  cursor: pointer;
}
</style>