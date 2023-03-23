<template>
  <div class="common-layout">

    <el-container>
      <div class="affix-container">
        <el-affix :offset="60">
          <source-aside :asideConf="asideConf" @transfer="getText"/>
        </el-affix>
      </div>
      <el-container>
        <source-main ref="source_main_child" :text="text"/>
      </el-container>
    </el-container>
  </div>

</template>

<script>
import sourceAside from '@/components/source/source_aside.vue'
import sourceMain from '@/components/source/source_main.vue'
import card from '@/components/modules/source/card.vue';


export default {
  components: {
    card,
    sourceAside,
    sourceMain
  },
  data() {
    return {
      text: '编程语言',
      windowWidth: '',
      asideConf: {
        asideWidth: '220px',
        isCollapse: false,
      }
    }
  },
  created() {
    // 初始化当前窗口宽度
    this.windowWidth = document.documentElement.clientWidth;
  },
  watch: {
    //检测查看变化
    windowWidth() {
      this.handlerWidth(this.windowWidth)
    }
  },
  mounted() {

    this.handlerWidth(this.windowWidth)
    window.onresize = () => {
      return (() => {
        this.windowWidth = document.documentElement.clientWidth
      })()
    };

  },
  methods: {
    debounce(fn, delay) {
      // 存储定时标识符，以便清除定时器
      let timer = null
      return function _debounce() {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          fn()
        }, delay)
      }
    },
    //获取当前点击文本
    getText(value) {
      this.text = value
    },
    //处理屏幕宽度变化
    handlerWidth(value) {
      if (value <= 1024) {
        this.asideConf = {
          asideWidth: '65px',
          isCollapse: true
        }
      } else {
        this.asideConf = {

          asideWidth: '220px',
          isCollapse: false
        }

      }
    }
  },
  //组件摧毁的钩子:清除窗口事件
  beforeDestroy() {
    window.onresize = null
  }
}


</script>


