<template>
  <el-aside :width="asideConf.asideWidth" class="transition-show min-h-screen">
    <el-scrollbar>
      <el-menu
          default-active="/type/language"
          class="el-menu-vertical-demo shadow-sm min-h-screen menu-aside"
          :collapse="asideConf.isCollapse"
          unique-opened="true"
          router="true"
          @click="getText($event)">
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <span class="iconfont">&#xe650;</span>
            </el-icon>
            <span>全部</span>
          </template>
          <el-menu-item-group>
            <template #title>
              <el-icon>
                <span class="iconfont text-amber-300">&#xe847;</span>
              </el-icon>
              <span class="text-amber-400">
                  热 门
              </span>
            </template>
            <el-menu-item index="/type/language">编程语言</el-menu-item>
            <el-menu-item index="/type/work">求职</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template #title>
              <span class="text-purple-400">
                <span class="iconfont">&#xe76a;</span>
                  推 荐
              </span>
            </template>
            <el-menu-item index="/type/design">设计</el-menu-item>
            <el-menu-item index="/type/video">
              教程
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item index="/type/book">
          <el-icon>
            <span class="iconfont ">&#xe720;</span>
          </el-icon>
          <span>书籍</span>
        </el-menu-item>
        <el-menu-item index="/type/video">

          <el-icon>
            <span class="iconfont ">&#xe636;</span>
          </el-icon>
          <span>找教程</span>
        </el-menu-item>
        <el-menu-item index="/type/tool">
          <el-icon>
            <span class="iconfont ">&#xe61b;</span>
          </el-icon>
          <span>找工具</span>
        </el-menu-item>
        <el-sub-menu index="5">
          <template #title>
            <el-icon>
              <span class="iconfont ">&#xe678;</span>
            </el-icon>
            <span>编程语言</span>
          </template>
          <el-menu-item index="/type/java">Java</el-menu-item>
          <el-menu-item index="/type/python">Python</el-menu-item>
          <el-menu-item index="/type/vue">Vue</el-menu-item>
          <el-menu-item index="/type/javascript">Javascript</el-menu-item>
          <el-menu-item index="/type/go">Go语言</el-menu-item>
          <el-menu-item index="/type/c">C/C++</el-menu-item>
          <el-menu-item index="/type/AI">人工智能</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="6">
          <template #title>
            <el-icon>
              <span class="iconfont ">&#xe652;</span>
            </el-icon>
            <span>方向</span>
          </template>
          <el-menu-item index="/type/front">前端</el-menu-item>
          <el-menu-item index="/type/backstage">后端</el-menu-item>
          <el-menu-item index="/type/AI">人工智能</el-menu-item>
          <el-menu-item index="/type/BigData">大数据</el-menu-item>
          <el-menu-item index="/type/robot">机器学习</el-menu-item>
          <el-menu-item index="/type/Internet">物联网</el-menu-item>
          <el-menu-item index="/type/Android">安卓</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </el-aside>


</template>

<script>

export default {

  props: {
    asideConf: {
      type: Object,
      default: {
        asideWidth: '220px',
        isCollapse: false,
      }
    },

  },
  mounted() {

  },
  methods: {
    //获取当前点击的选项传给父组件
    getText(event) {
      this.$emit('transfer', event.target.innerText)//触发transfer方法
    }
  },
  computed: {
    //计算滚动条大小适应窗口
    // scrollHeight() {
    //   if (window.screen.height > 800) {
    //     return window.screen.height + 'px'
    //   }
    //   return window.screen.height * 0.7 + 'px'
    // }
  }
}
</script>

<style scoped>
.menu-aside > .el-sub-menu .is-active {
  border-right: 4px #409eff solid;
}

</style>
