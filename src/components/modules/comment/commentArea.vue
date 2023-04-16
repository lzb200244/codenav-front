<template>

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
        @onCreated="handleCreated"/>
    <el-button type="primary" class="float-right m-6" @click="remark(replayUser.replayId)">{{ opt }}</el-button>
  </div>
  <template v-if="commentList">
    <el-row style="text-align: left;width: 100%">
      <comments :comment="commentList"/>
    </el-row>
  </template>


</template>

<script>
import '@wangeditor/editor/dist/css/style.css'
import comments from "@/components/modules/comment/comments.vue"
import comment from "@/mixins/comment";
import {mapState} from "vuex";
import {onBeforeUnmount, shallowRef} from 'vue'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'

export default {

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
    comments, Editor, Toolbar
  },
  mixins: [comment],
  computed: {
    ...mapState({
      commentList: state => state.Hall.commentList,
      replayUser: state => state.Hall.replayUser
    }),
    opt() {
      return '@ ' + this.replayUser.replayName
    }
  },

}


</script>

<style scoped>

</style>