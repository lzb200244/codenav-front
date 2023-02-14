<template>
  <div class="common-layout bg-light-600">
    <navHeader/>
    <el-container>
      <div class="affix-container">
        <el-affix :offset="60">
          <el-aside :width="asideWidth" class="transition-show ">
            <el-menu
                :default-active="activeIndex"
                class="el-menu-vertical-demo shadow-sm transition-show ml-2 min-h-screen menu-aside"
                :collapse="isCollapse"
                unique-opened="true"
                router="true"
            >
              <el-menu-item index="/account/person">
                <el-icon>
                  <span class="iconfont">&#xe605;</span>
                </el-icon>
                <template #title>个人简介</template>
              </el-menu-item>

              <el-menu-item index="/account/collect">
                <el-icon>
                  <span class="iconfont">&#xe7df;</span>
                </el-icon>
                <template #title>收 藏</template>
              </el-menu-item>

              <el-menu-item index="/account/recommend">
                <el-icon>
                  <span class="iconfont">&#xe76a;</span>
                </el-icon>
                <template #title>推 荐</template>
              </el-menu-item>
              <el-badge :value="hitCount===0?'':hitCount" :max="20" class="item" type="primary">
                <el-menu-item index="/account/inform">
                  <el-icon>
                    <span class="iconfont">&#xe602;</span>
                  </el-icon>
                  <template #title>消息通知</template>
                </el-menu-item>
              </el-badge>
              <el-menu-item>
                <el-icon>
                  <span class="iconfont">&#xe63e;</span>
                </el-icon>
                <template #title>邀请基友</template>
              </el-menu-item>
              <el-menu-item>
                <el-icon style="color: #fbbf24">
                  <span class="iconfont">&#xe61a;</span>
                </el-icon>
                <template #title>积分记录</template>
              </el-menu-item>
            </el-menu>
          </el-aside>
        </el-affix>
      </div>
      <el-container>
        <el-main width="100%" class="min-h-screen " style="background:#f0f2f5;">
          <router-view
              v-if="initShow"
              :is="activeIndex.split('/')[2]"
          ></router-view>

        </el-main>
      </el-container>
    </el-container>
    <navFooter/>
  </div>
</template>

<script>

import collect from '@/components/manage/account/collect.vue';
import recommend from '@/components/manage/account/recommend.vue';
import person from '@/components/manage/account/person.vue';
import {mapState} from "vuex";


export default {
  components: {
    collect,
    recommend,
    person
  },

  data() {
    return {
      initShow: false,
      isCollapse: false,
      windowWidth: document.documentElement.clientWidth,
      asideWidth: '220px',
    }
  },
  methods: {
    handlerWidth(value) {
      if (value <= 1024) {
        this.isCollapse = true;
        this.asideWidth = '65px'
      } else {
        this.isCollapse = false;
        this.asideWidth = '220px'
      }
    }
  },
  computed: {
    ...mapState(['hitCount']),
    //获取路由当前访问组件
    activeIndex() {
      return this.$route.fullPath
    },

  },
  mounted() {

    this.initShow = true;
    this.handlerWidth(this.windowWidth)
    window.onresize = () => {
      return (() => {
        this.windowWidth = document.documentElement.clientWidth;
      })()
    };
  },
  watch: {
    windowWidth(value) {
      this.handlerWidth(value);
    }
  },
}


</script>

<style scoped>

.menu-aside > .is-active {
  border-right: 4px #409eff solid;
}

.transition-show {
  transition: 0.5s;
  -moz-transition: 0.5s; /* Firefox 4 */
  -webkit-transition: 0.5s; /* Safari and Chrome */
  -o-transition: 0.5s; /* Opera */
}


</style>
