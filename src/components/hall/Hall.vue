<template>
  <div>
    <el-row style="max-width: 1350px;margin: 0 auto;">
      <el-container>
        <el-header style="height: 100px;align-items: center"
                   class="my-5 bg-cyan-50 p-6 flex">
          <el-row :gutter="40" style="width: 100%;">
            <el-col :md="8">
              <el-form-item label="类型筛选">
                <mySelect/>
              </el-form-item>
            </el-col>
            <el-col :md="8">
              <el-form-item label="精确搜索">
                <el-input size="large" placeholder="对当前条件进行搜索"/>
              </el-form-item>
            </el-col>
            <el-col :md="8">
              <el-button type="primary" style="float: right" size="large">写问答</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-main class="my-3">
          <router-view></router-view>
        </el-main>
      </el-container>

    </el-row>
  </div>
</template>

<script>

import mySelect from '/src/components/modules/select.vue';

export default {
  name: "hall",
  components: {
    mySelect
  }

}
</script>

<style scoped>

</style>
