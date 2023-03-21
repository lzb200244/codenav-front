<template>

  <el-row style="text-align: left;width: 100%" v-if="commentList.length!==0">
    <comments :comment="commentList"/>
  </el-row>
</template>

<script>
import comments from "@/components/modules/comment/comments.vue"
import {mapState} from "vuex";
import comment from "@/mixins/comment";
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import {onBeforeUnmount, ref, shallowRef} from 'vue'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'

export default {


  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    // 内容 HTML
    const valueHtml = ref('<p>hello</p>')
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
      valueHtml,
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
      commentList: state => state.Hall.commentList
    }),
  },

}


</script>

<style scoped>

</style>