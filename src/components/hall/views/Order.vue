<template>
  <div class="bg-cyan-50 p-6">

    <template v-if="orders.length!==0">
      <template v-for="order in orders" :key="order.uid">

        <el-page-header class="mt-15">
          <template #title>
            <span>订单记录</span>
          </template>
          <template #content>
            <div class="flex items-center">
              <el-avatar
                  class="mr-3"
                  :size="32"
                  :src="order.goods.img"/>
              <span class="text-large font-600 mr-3"> {{ order.goods.title }} </span>
              <el-tag>{{ order.status }}</el-tag>
            </div>
          </template>
          <template #extra>
            <div class="flex items-center">
              <el-button>打 印</el-button>
              <el-button type="primary" class="ml-2">催 发</el-button>
            </div>
          </template>
          <el-descriptions :column="2" class="mt-4">
            <el-descriptions-item label="消费者">{{ order.customer }}</el-descriptions-item>
            <el-descriptions-item label="消费时间">{{ order.create_time }}</el-descriptions-item>
            <el-descriptions-item label="数量">{{ order.count }}</el-descriptions-item>
            <el-descriptions-item label="总金额">{{ order.amount }}</el-descriptions-item>
            <el-descriptions-item label="订单状态">
              <el-tag>{{ order.status }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="原因"><b>{{ order.cause ?? 'success' }}</b></el-descriptions-item>

          </el-descriptions>
          <p>订单号:
            <el-text>{{ order.uid }}</el-text>
          </p>

        </el-page-header>

      </template>
    </template>
    <template v-else>
      <el-empty description="没有发现跟多订单信息"/>
    </template>


  </div>

</template>

<script>
import list from "@/components/modules/general/list.vue";
import {mapState} from "vuex";

export default {
  components: {
    list
  },

  name: "Order",
  mounted() {
    this.$store.dispatch('orderAsync')
  },
  computed: {
    ...mapState({
      orders: state => state.Hall.orders,
    })
  }
}
</script>

<style scoped>

</style>