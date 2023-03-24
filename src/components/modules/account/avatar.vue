<template>
  <template v-if="avatar!=='key'">
    <el-avatar :class="randColor" :size="48" :src="avatar">
    </el-avatar>
  </template>
  <template v-else>
    <el-avatar :class="randColor" :size="48">{{ username.slice(0, 2) }}</el-avatar>
  </template>
</template>

<script>
export default {
  name: "avatar",
  props: ['avatar', 'username'],
  computed: {
    randColor() {
      return ['bg-slate-700', 'bg-zinc-500', 'bg-blue-500',][Math.floor(Math.random() * 4)]
    }
  }
}
</script>

<style scoped>

</style>