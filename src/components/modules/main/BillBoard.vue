<template>
  <div>
    <el-card shadow="never" style="border: 0" class="box-card my-4 mx-auto">
      <template #header>
        <div class="card-header">
          <span>{{ config?.title }}</span>
          <el-link target="_blank" type="primary" class="float-right" :href="config?.link" :underline="false">点我
          </el-link>
        </div>
      </template>
      <template #default>
        <el-row>
          <el-col :span="6">
            <el-avatar :shape="config?.shape" :src="config?.img" :size="50"></el-avatar>
          </el-col>
          <el-col :span="18">
            <p class="text-sm">
              {{ config?.introduce }}
            </p>
          </el-col>
        </el-row>
      </template>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "BillBoard",
  props: {
    config: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style scoped>

</style>