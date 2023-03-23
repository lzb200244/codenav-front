<template>
  <div>
    <el-row :gutter="20" justify="space-around">
      <el-col :xs="24" :sm="12">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>总排名</span>
              <el-button style="float: right" type="primary" @click="findRank">
                <el-icon style="vertical-align: middle" class="mr-3">
                  <Search/>
                </el-icon>
                我的排名
              </el-button>
            </div>
          </template>
          <ranks :ranks="ranks"/>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>周排名</span>
              <el-date-picker
                  v-model="week"
                  value-format="YYYY/MM/DD"
                  type="week"
                  format="[Week] ww"
                  placeholder="Pick a week"
              />
            </div>
          </template>
          <ranks :ranks="weekRank"/>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog v-model="centerDialogVisible" width="25%">
      <template #title>

        <el-icon style="color: #ffaf32;font-size: 20px">
          <GoldMedal/>
        </el-icon>
        我的排名
      </template>
      <p>
        您当前的积分排名为: <span style="font-weight: bolder;">{{ my }}</span>
      </p>
      <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确认</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import ranks from '@/components/modules/hall/rank.vue';
import {getRank, myRank} from "@/apis/hall";
import {mapState} from "vuex";
import {GoldMedal, Search} from '@element-plus/icons-vue'

export default {
  components: {
    ranks, GoldMedal, Search
  },
  data() {
    return {
      week: '',
      weekRank: [],
      centerDialogVisible: false,
      my: 0
    }
  },
  mounted() {
    //获取当前周排序
    this.$store.dispatch('rankAsync')
    getRank(undefined, 1).then(res => {
      this.weekRank = Object.freeze(res.data)
    })

  },
  computed: {
    ...mapState({
      ranks: state => state.Hall.ranks,
    })
  },
  watch: {
    /**
     * 筛选周
     * @param val
     */
    week(val) {
      getRank(val, 1).then(res => {
        this.weekRank = res.data
      })
    }
  },
  methods: {
    findRank() {
      if (this.my === 0) {
        myRank().then(res => {
          this.my = res.data
        })
      }
      this.centerDialogVisible = true

    }
  },
  name: "Rank"
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  max-width: 500px;
}
</style>
