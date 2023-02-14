<template>


  <div class="common-layout">
    <el-container>
      <el-main class="p-2" style="overflow-y: hidden">
        <el-row :gutter="10" class="p-3 bg-light-50  " style="margin-right: 0;margin-left: 0;">
          <p class="inform">
            最新情报
          </p>
          <el-divider class="mt-0"/>
          <el-form :inline="true" :model="picker_filter" class="demo-form-inline">
            <el-form-item label="筛选类型">
              <el-select v-model="picker_filter.type" placeholder="选择筛选类型" size="large">
                <el-option
                    v-for="item in informOption"
                    :key="item[0]"
                    :label="item[1]"
                    :value="item[0]"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="筛选日期">
              <el-date-picker
                  value-format="YYYY/MM/DD"
                  v-model="picker_filter.picker"
                  type="date"
                  placeholder="选择筛选日期"
                  size="large"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="filterInform">查询</el-button>
            </el-form-item>
            <el-form-item @click="clearConfirm=true" class="cursor-pointer" style="margin-right: auto">
              <el-tooltip
                  class="box-item "
                  content="清空"
                  placement="bottom">
                <el-icon>
                  <DeleteFilled/>
                </el-icon>
              </el-tooltip>
            </el-form-item>

          </el-form>
        </el-row>
        <div class="demo-collapse">
          <el-scrollbar height="500px">
            <template v-for="(item,index) in Informs" :key="item.pk">
              <el-alert
                  @close="clearInformItem(item.pk,false)"
                  :title="item.type"
                  :type="item.leave">
                <template #default>
                  <div>
                    <p v-html="item.content" style="margin-left: 40px;color: #777;font-size: 12px;">
                    </p>
                    <span style="color: #999;font-size: 8px">{{ item.create_time }}</span>
                  </div>
                </template>
              </el-alert>
            </template>
          </el-scrollbar>
        </div>
      </el-main>
    </el-container>
    <el-dialog
        v-model="clearConfirm"
        title="Tips"
        width="30%"
        :before-close="handleClose">
      <span>是否清空所有通知</span>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="clearConfirm = false">取消</el-button>
        <el-button type="primary" @click="clearInformItem(0,true)">
          清空
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>


</template>

<script>

import {getInforms, deleteInforms} from "@/apis/account";
import {mapState} from "vuex";
import message from "@/utils/messager";
import {DeleteFilled} from '@element-plus/icons-vue'

export default {
  components: {
    DeleteFilled
  },
  data() {
    return {
      clearConfirm: false,//清空确认宽
      picker_filter: {
        type: 1,
        picker: new Date().toLocaleDateString()
      },
      informs: []
    }
  },
  mounted() {

    this.$store.dispatch('informsAsync')
  },
  computed: {
    ...mapState(['Informs']),
    informOption() {

      let allSelect = this.$store.state.allSelect
      if (allSelect === null) {
        return []
      }

      return allSelect.inform
    }
  },
  watch: {},
  methods: {
    /**
     *清除通知
     * */

    clearInformItem(pk, clearAll) {
      deleteInforms(pk, clearAll).catch(res => {
        message("删除失败", 'warning')
      })
      this.$store.commit('clearHitCount', clearAll)
      let filters = clearAll ? [] : Object.freeze(this.Informs.filter(item => item.pk !== pk))
      this.$store.commit('setInform', filters)
      this.clearConfirm = false
    },
    filterInform() {
      /**
       * 筛选
       */
      getInforms(this.picker_filter).then(res => {
        this.$store.commit('setInform', Object.freeze(res.data))
      })
    }
  }
}
</script>
<style scoped>
.el-alert {
  margin: 10px 0 0;
}
</style>
