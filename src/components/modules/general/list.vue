<template>

    <el-row class="m-6">

      <el-col class="flex items-center">
        <el-image
            class="mr-3"
            :style="imgConf.style"
            :src="imgConf.src"/>
        <span class="text-large font-600 mx-6"> {{ title }} </span>
        <span class="text-sm mr-2" style="color: var(--el-text-color-regular)">{{ content }}</span>
        <slot name="tag">
          <el-tag style="margin-left: auto">Default</el-tag>
        </slot>
        <div style="margin-left: auto">
          <slot name="opt">
          </slot>
        </div>
      </el-col>
      <el-divider border-style="dashed"/>

    </el-row>



</template>

<script>
export default {

  props: {
    imgConf: {
      default: {
        src: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        style: {height: '75px'}
      }
    },
    title: {
      default: 'title'
    },
    content: {
      default: 'content'
    },

  },
  name: "list",

}
</script>

