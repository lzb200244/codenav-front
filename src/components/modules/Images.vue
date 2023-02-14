<template>
  <el-row v-for="(item,index) in ImagesList" :key="item" style="float: left">
    <div style="display: flex;justify-content: space-between">
      <el-radio :label="item" @change="clickImages" size="large" v-model="radio" style="height:auto;width: auto">
        <el-avatar class="bg-light-50 p-2 m-1" shape="square" :size="100" :src="item"/>
        <div style="text-align: center" v-if="showText">{{ item.split("/")[3].split('.')[0] }}</div>
      </el-radio>
    </div>
  </el-row>
</template>

<script>
/*
* todo 选择图片组件
*
* */
export default {
  props: {
    ImagesList: {
      //图片对象
      type: Array,
      default: []
    },
    showText: {
      //是否显示图片说明
      type: Boolean,
      default: true
    }
  },
  name: 'images',

  data() {
    return {
      radio: '',
      list: []
    }
  },
  methods: {
    //点击的图片对象
    clickImages(value) {
      this.$emit('sendImages', value)
    }
  }
}
</script>

<style scoped>

</style>
