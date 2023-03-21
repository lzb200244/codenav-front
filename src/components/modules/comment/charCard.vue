<template>
  <div>
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
    <el-row class=" my-5" :style="config.style">
      <el-text size="large">
        {{ chat.content }}
      </el-text>
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

        <div @click="handleLookComments(chat.id)" class="opt">
          <el-badge is-dot class="item">
            <el-icon>
              <ChatLineRound/>
            </el-icon>
          </el-badge>
          <el-text class="ml-2 " style="font-size: 14px">查看评论</el-text>
        </div>
      </el-col>
      <el-col :xs="3" :sm="3" :md="3">
        <el-popover
            placement="top"
            :width="500"
            trigger="click">
          <template #default>
            <div style="border: 1px solid #ccc">
              <Toolbar
                  style="border-bottom: 1px dashed #ccc"
                  :editor="editorRef"
                  :defaultConfig="toolbarConfig"
                  :mode="mode"
              />
              <Editor
                  style="height: 200px;"
                  v-model="valueHtml"
                  :defaultConfig="editorConfig"
                  :mode="mode"
                  @onCreated="handleCreated"
              />
            </div>
            <el-button type="primary" class="float-right mt-3" @click="remark(chat.id)">
              发 送
              <el-icon>
                <Position/>
              </el-icon>
            </el-button>
          </template>
          <template #reference>
            <div class="opt">
              <el-icon>
                <ChatDotRound/>
              </el-icon>
              <el-text class="ml-2 " style="font-size: 14px">回复</el-text>
            </div>
          </template>
        </el-popover>
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
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {handleTrump, getChatList} from "@/apis/hall";
import {ChatLineRound, Pointer, WarnTriangleFilled, ChatDotRound, Position} from '@element-plus/icons-vue'
import comment from "@/mixins/comment";
import {onBeforeUnmount, ref, shallowRef} from 'vue'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'

export default {
  name: "charCard",
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    // 内容 HTML

    const value = ref('<p>hello</p>')
    const toolbarConfig = {                        // JS 语法
      /* 工具栏配置 */
      toolbarKeys: [
        // 菜单 key
        'headerSelect',
        // 分割线
        '|',

        // 菜单 key
        'bold', 'italic',

        // 菜单组，包含多个菜单
        {
          key: 'group-more-style', // 必填，要以 group 开头
          title: '更多样式', // 必填
          iconSvg: '<svg>....</svg>', // 可选
          menuKeys: ["through", "code", "clearStyle"] // 下级菜单 key ，必填
        },
        // 继续配置其他菜单...
      ]
    }
    const editorConfig = {placeholder: '请输入内容...'}
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
      valueHtml: value,
      mode: 'simple', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated
    };
  },
  mixins: [comment],
  props: {
    chat: {
      default: [],
      type: Object
    },
    config: {
      default: {
        style: {
          height: '120px'
        },
        isShowComments: true
      }
    }
  },
  components: {
    Editor, Toolbar,
    ChatLineRound, Pointer, WarnTriangleFilled, ChatDotRound, Position
  },
  methods: {
    handleLookComments(id) {
      getChatList(id).then(res => {
        this.$store.commit('setCommentList', res.data)
      })
    },
    trumpClick(id) {
      const items = []
      const chatList = this.$store.state.Hall.chats
      for (let i = 0; i < chatList.length; i++) {
        if (chatList[i].id === id) {
          chatList[i].like += 1
        }
        items.push(chatList[i])
      }
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