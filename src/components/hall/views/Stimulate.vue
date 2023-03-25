<template>
  <div class="bg-cyan-50 p-6">
    <template v-if="goods.length!==0">
      <el-card v-for="good in goods" :key="good.id" style="border: none" class="my-4" shadow="never">
        <template #default>
          <el-row style="align-items: center">
            <el-col :xs="6" :sm="6">
              <el-image style="height: 150px"
                        :src="good.img"
                        :preview-src-list="[good.img]">
                <template #error>
                  <div class="image-slot">
                    <el-icon>
                      <icon-picture/>
                    </el-icon>
                  </div>
                </template>
              </el-image>
            </el-col>
            <el-col :xs="0" :sm="4">
              <el-text>{{ good.title }}</el-text>
            </el-col>
            <el-col :xs="8" :sm="6">
              <el-text>{{ good.price }}积分/本</el-text>
            </el-col>
            <el-col :xs="10" :sm="8">
              <el-text class="mx-3">库存 : {{ good.store }}</el-text>
              <el-button :disabled="good.store===0" @click="bug(good.id)">兑换</el-button>
            </el-col>
          </el-row>
        </template>
      </el-card>


    </template>
    <template v-else>
      <el-empty description="没有发现跟多商品"/>
    </template>


  </div>
</template>

<script>

import {Picture as IconPicture} from '@element-plus/icons-vue'

import {mapState} from "vuex";
import {buyGoods} from "@/apis/hall";
import message from "@/utils/messager";

export default {
  name: "Stimulate",
  components: {
    IconPicture
  },
  mounted() {
    this.$store.dispatch('stimulateGoodsAsync')

  },
  methods: {
    bug(id) {
      buyGoods({id}).then(res => {
        switch (res.data) {
          case 1: {
            //消费成功
            message(res.msg,)
            this.$store.commit('subStimulateGoodsStore', id)
            break
          }
          case 0: {
            message(res.msg, 'warning')
            break
          }
        }
      })

    }
  },
  computed: {
    ...mapState({
      goods: state => state.Hall.goods,
    }),
  }
}
</script>

<style scoped>

</style>