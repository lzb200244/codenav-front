<template>
  <div>
    <el-tabs v-model="currentTab" class="p-3 bg-cyan-50" @tab-click="handleTab">
      <el-tab-pane label="推荐" name="recommend">
      </el-tab-pane>
      <el-tab-pane label="热门" name="hot"></el-tab-pane>
      <el-tab-pane label="最新" name="latest"></el-tab-pane>
      <el-button @click="drawer = true" type="primary" style="float: right" size="large">写问答</el-button>
    </el-tabs>

    <div class="chats">
      <template v-for="chat in chats" :key="chat.id">
        <el-card class="bg-cyan-50" shadow="never" style="border: none;margin-bottom: 20px;">
          <char-card @chat-changed="handleChangeChatId" :chat="chat"/>
          <el-row class="mt-15" v-if="chat.id===chatId">
            <comment-area/>
          </el-row>
        </el-card>
      </template>
    </div>
    <el-drawer v-model="drawer"
               width="450"
               title="写问答">
      <template #default>
        <div style="border: 1px solid #ccc;width: 100%;">
          <Toolbar
              id="replay"
              style="border-bottom: 1px dashed #ccc"
              :editor="editorRef"
              :defaultConfig="toolbarConfig"
              :mode="mode"/>
          <Editor
              style="height: 200px;"
              v-model="commentObj.content"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="handleCreated"
          />
        </div>
        <el-row>
          <el-select style="width: 100%"  size="large"
                     v-model="this.commentObj.issue_type" class="m-2 mt-10" placeholder="Select">
            <el-option

                v-for="item in chatSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
          </el-select>
        </el-row>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer = false">取消</el-button>
          <el-button type="primary" @click="publishIssue">发 布</el-button>
        </div>
      </template>
    </el-drawer>

  </div>
  <!--  {{ $store.state.Hall.commentList }}-->

</template>

<script>
import {mapState} from "vuex";
import {ChatLineRound, Pointer, WarnTriangleFilled} from '@element-plus/icons-vue'

import CommentArea from "@/components/modules/comment/commentArea.vue";
import CharCard from "@/components/modules/comment/charCard.vue";
import {onBeforeUnmount, shallowRef} from 'vue'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import comment from "@/mixins/comment";


export default {
  name: "chatGroup",
  props: ['filterObj'],
  mixins: [comment],
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    // 内容 HTML
    const toolbarConfig = {                        // JS 语法
      /* 工具栏配置 */
      toolbarKeys: [
        // 菜单 key
        'headerSelect',
        // 分割线
        '|',
        // 菜单 key
        'bold',
        'italic',
        // 菜单组，包含多个菜单
        "through", "code", "clearStyle",
        // 继续配置其他菜单...
        'emotion'
      ]
    }
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

      mode: 'simple', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated
    };
  },

  components: {
    Editor, Toolbar,
    CharCard,
    CommentArea,
    ChatLineRound, Pointer, WarnTriangleFilled
  },
  data() {
    return {
      selectOptions: [{value: 1, label: '问答'}],
      drawer: false,
      currentTab: 'recommend',
      chatId: 0, //选择的查看评论父id,
    }
  },
  mounted() {

    this.$store.dispatch('chatAsync')
  },

  methods: {
    /**
     * 发布问答
     */
    publishIssue() {
      this.remark()
      this.drawer = true
    },
    handleTab(tab) {
      //筛选最新与最热
      this.filterObj.order = tab.props.name
      this.handleFilterChat(this.filterObj)

    },
    handleChangeChatId(id) {
      this.chatId = id
    }

  },
  computed: {

    ...mapState({
      chats: state => state.Hall.chats,
      chatSelect: state => state.Operation.allSelect.chatSelect,
    }),
  }
}
</script>

