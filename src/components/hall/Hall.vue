<template>
  <div>
    <el-row style="max-width: 1350px;margin: 0 auto;">
      <el-container>
        <el-header style="height: 100px;align-items: center"
                   class="my-5 bg-cyan-50 p-6 flex">
          <el-row :gutter="40" style="width: 100%;">
            <el-col :md="8">
              <el-form-item label="类型筛选">
                <el-select v-model="filterObj.type" clearable placeholder="Select">
                  <el-option
                      v-for="item in selectOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="8">
              <el-form-item label="精确搜索">
                <el-input size="large" v-model="filterObj.title" placeholder="对当前条件进行搜索"/>
              </el-form-item>
            </el-col>
            <el-col :md="8">
              <el-button @click="handleFilter" type="primary" style="float: right" size="large">操作</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-main class="my-3">
          <router-view :filterObj="filterObj"></router-view>
        </el-main>
      </el-container>

    </el-row>
  </div>
</template>

<script>
import comment from "@/mixins/comment";

export default {
  name: "hall",
  mixins: [comment],

  data() {
    return {
      selectOptions: [{value: 1, label: '问答'}],
      filterObj: {
        type: 1,
        title: '',
        order: 'recommend'
      }
    }
  },
  methods: {
    handleFilter() {
      //
      this.handleFilterChat(this.filterObj)
    }
  },

}
</script>

<style scoped>

</style>
