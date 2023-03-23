<template>
  <div>
    <el-row>
      <user-card :mode="'comment'" :classList="'w-60'" :shadow="'never'" :user-obj="chat"/>
    </el-row>

    <el-row class="my-4" :style="config.style">
      <Editor
          style="height: 200px;"
          v-model="chat.content"
          :defaultConfig="{readOnly :true}"
          @onCreated="handleCreated"
      />
    </el-row>
    <el-row>
      <el-col :xs="6" :sm="4" :md="4"> {{ chat.create_time }}</el-col>
      <el-col :xs="3" :sm="3" :md="3">
        <div class="opt" @click="trumpClick(chat.id)">
          <el-icon>
            <Pointer/>
          </el-icon>
          <el-text class="ml-2" style="font-size: 14px">{{ chat.like }}</el-text>
        </div>
      </el-col>
      <el-col :xs="3" :sm="3" :md="3" v-if="config.isShowComments">

        <div @click="handleLookComments(chat.id,chat.user.username)" class="opt">
          <el-badge is-dot class="item">
            <el-icon>
              <ChatLineRound/>
            </el-icon>
          </el-badge>
          <el-text class="ml-2 " style="font-size: 14px">查看评论</el-text>
        </div>
      </el-col>
      <el-col :xs="3" :sm="3" :md="3">
        <div class="opt" @click="sendReplayUser(chat.id,chat.user.username)">
          <el-icon>
            <ChatDotRound/>
          </el-icon>
          <el-text class="ml-2 " style="font-size: 14px">回复</el-text>
        </div>
      </el-col>
      <el-col :xs="3" :sm="3" :md="3">
        <div class="opt">
          <el-icon>
            <WarnTriangleFilled/>
          </el-icon>
          <el-text class="ml-2" style="font-size: 14px">举报</el-text>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import {handleTrump, getChatList} from "@/apis/hall";
import {ChatLineRound, Pointer, WarnTriangleFilled, ChatDotRound, Position} from '@element-plus/icons-vue';
import comment from "@/mixins/comment";
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import {onBeforeUnmount, shallowRef} from 'vue';
import {Editor} from '@wangeditor/editor-for-vue'

import userCard from "@/components/modules/account/userCard.vue";

export default {
  name: "charCard",
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    // 内容 HTML
    const editorConfig = {placeholder: '请输入内容...',}
    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })
    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }
    return {
      editorRef,
      editorConfig,
      handleCreated
    };
  },
  mixins: [comment],

  props: {
    value: {
      type: Number,
      required: true
    },
    chat: {
      default: [],
      type: Object
    },
    config: {
      default: {
        style: {
          height: '140px'
        },
        isShowComments: true
      }
    }
  },
  components: {
    Editor,
    ChatLineRound, Pointer, WarnTriangleFilled, ChatDotRound, Position, userCard
  },
  methods: {
    /**
     * 获取当前处于的评论区
     * @param replayId
     * @param replayName
     */
    handleLookComments(replayId, replayName) {

      this.$emit('chat-changed', replayId)
      //当前点击的评论区
      this.$store.commit('setReplayUser', {replayId, replayName})
      /**
       * 请求当前评论区的所有评论包括子回复
       */
      getChatList({chatId: replayId}).then(res => {

        this.$store.commit('setCommentList', res.data)
      })
    },
    /**
     * 处理回复时回复人的id
     * @param replayId
     * @param replayName
     */
    sendReplayUser(replayId, replayName) {
      location.href = location.href.replaceAll('#replay', '') + '#replay'
      //  存储在当前回复的id
      this.$store.commit('setReplayUser', {replayId, replayName})
    },
    /**
     * 点赞
     * @param id
     */
    trumpClick(id) {
      /**
       *更新点赞
       */
      const items = []
      const chatList = this.$store.state.Hall.chats
      for (let i = 0; i < chatList.length; i++) {
        if (chatList[i].id === id) {
          chatList[i].like += 1
        }
        items.push(chatList[i])
      }
      /**
       * 提交点赞
       */
      handleTrump({id})
      this.$store.commit('setChat', items)
    }
  }
}
</script>

<style scoped>

.opt {
  cursor: pointer;
}
</style>