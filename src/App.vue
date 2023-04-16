<script setup>
import navHeader from '@/components/header.vue';
import navFooter from '@/components/footer.vue';
import {MoreFilled} from '@element-plus/icons-vue'
import {getNews} from "@/apis/operation";
import {ref} from 'vue'

let news = []
const getNew = () => {
  getNews().then(res => {
    news = Object.freeze(res.data)
    centerDialogVisible.value = true
  })
}


const centerDialogVisible = ref(false)

</script>
<template>
  <div class="common-layout bg-light-600">
    <el-button class="update_info" circle type="primary" @click="getNew">
      <el-icon>
        <MoreFilled/>
      </el-icon>
    </el-button>
    <el-dialog
        v-model="centerDialogVisible"
        title="近期更新"
        width="30%"
        align-center>
      <el-timeline>
        <el-timeline-item
            v-for="(item, index) in news"
            :key="index"
            :type="item.type"
            :color="item.color"
            :timestamp="item.create_time">
          <div>
            <p style="font-weight: bolder">{{ item.title }}</p>
            <p style="font-size: 10px"> {{ item.content }}</p>
          </div>
        </el-timeline-item>
      </el-timeline>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">
          收到
        </el-button>
      </span>
      </template>
    </el-dialog>
    <div class="header">
      <navHeader/>
    </div>
    <div style="min-height: 100vh" class="content">
      <router-view id="content"></router-view>
    </div>
    <div class="footer">
      <navFooter/>
    </div>

  </div>

</template>

<style>
#nprogress .bar {
  background: #d4dcff !important;
  height: 1px !important;
}

.update_info {
  position: fixed;
  right: 5%;
  bottom: 5%;
  z-index: 1100;
  width: 45px !important;
  height: 45px !important;

}

.el-header {
  margin: 0;
  padding: 0;
}

html {
  overflow-x: hidden;
}
</style>
