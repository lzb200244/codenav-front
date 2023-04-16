<template>
  <el-card style="border: none" :body-style="{padding:' auto ',}" :shadow="shadow" :class="classList">
    <template #default>
      <el-row class='flex' style="align-items: center">
        <el-col :xs="8" :sm="8">
          <avatar :avatar="userObj.user.avatar??'key'" :username="userObj.user.username"></avatar>
        </el-col>
        <el-col :xs="8" :sm="7">
          <el-popover
              placement="top"
              title="关于他(她)"
              :width="320"
              trigger="hover">
            <template #default>
              <el-row>
                <el-col :xs="14" :sm="14">
                  <avatar :avatar="userObj.user.avatar??'key'" :username="userObj.user.username"></avatar>
                  <el-tag class="ml-2" type="success">1级</el-tag>
                </el-col>
                <el-col :xs="3" :sm="3">
                  <template v-if="!followed">
                    <el-button type="primary" @click="follow(userObj.user.id,followed)">关 注
                    </el-button>
                  </template>
                  <template v-else>
                    <template></template>
                    <el-button @click="follow(userObj.user.id,followed)">
                      {{ userObj.user.cross ? "互相关注" : followStatus }}
                    </el-button>
                  </template>
                </el-col>
              </el-row>
              <el-row class="text-base">
                <el-col :xs="12" :sm="12">
                  <el-text>昵称: {{ userObj.user.username }}</el-text>
                </el-col>
                <el-col :xs="12" :sm="12">
                  <el-text>积分: {{ userObj.user.score }}</el-text>
                </el-col>
              </el-row>
              <el-row class="text-base mt-3">
                <el-col>
                  兴趣:
                  <el-tag class="m-1" v-for='habit in userObj.user.habit' :key="habit.value">{{ habit.label }}</el-tag>
                </el-col>
              </el-row>
              <el-row>
                <el-divider/>
              </el-row>
              <el-row class="text-sm text-handle text-dark-600">
                <el-col>
                  简介:
                  {{ userObj.user.introduce }}
                </el-col>
              </el-row>

            </template>
            <template #reference>
              <el-text class="cursor-pointer">{{ userObj.user.username }}</el-text>
            </template>
          </el-popover>

        </el-col>
        <el-col :xs="7" :sm="7">
          <template v-if="mode==='attention'">
            <template v-if="!followed">
              <el-button type="primary" @click="follow(userObj.user.id,followed)">关 注</el-button>
            </template>
            <template v-else>
              <el-button @click="follow(userObj.user.id,followed)">
                {{ userObj.user.cross ? "互相关注" : followStatus }}
              </el-button>
            </template>
          </template>
          <template v-else-if="mode==='comment'">

            <el-tag>{{ userObj.user.score }}</el-tag>
          </template>

        </el-col>
      </el-row>
    </template>
  </el-card>
</template>

<script>
import avatar from "@/components/modules/account/avatar.vue";
import {following} from "@/apis/hall";
import {mapState} from "vuex";

export default {
  components: {
    avatar
  },
  props: {
    //用户对象
    userObj: {
      require: true,
      // default: {
      //   "user": {
      //     "id": 1,
      //     "username": "裴",
      //     "avatar": "key",
      //     "score": 2,
      //     "introduce": "我来自外太空!",
      //     "habit": [],
      //     "cross": true
      //   }
      // }
    },
    //是否悬浮
    shadow: {
      default: 'hover',
      type: String
    },
    //类
    classList: {
      default: 'h-25 w-60 m-8',
      type: String
    },
    //展现形式
    mode: {
      default: 'attention'
    }
  },
  name: "userCard",
  data() {
    return {
      //是否是互关
      followStatus: '已关注'
    }
  },
  methods: {
    /**
     *
     * @param id
     * @param status false:关注 true:取关
     */
    follow(id, status) {
      //关注
      if (status === false) {
        //放入用户id的关注列表里
        this.$store.commit('addFollows', '' + id)
        //取关
      } else {
        this.$store.commit('popFollows', '' + id)
      }
      following({follow: id, status}).then(res => {
        if (res.data.cross) {
          // this.followStatus = '互相关注'
        }
      })
    }
  },
  computed: {
    ...mapState({
      follows: state => state.Account.follows,
    }),
    /**
     * 是否关注
     * @returns {*}
     */
    followed() {
      return this.follows.includes('' + this.userObj.user.id)
    }
  }
}
</script>

<style scoped>

</style>