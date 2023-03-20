<template>
  <div class="affix-container " v-if="$route.path!=='/login'">
    <el-affix>
      <el-header class="w-screen" style="padding: 0;z-index: 9999">
        <el-menu
            :default-active="$route.fullPath"
            class="el-menu-demo shadow-md flex "
            mode="horizontal"
            :unique-opened="true"
            :ellipsis="true"
            :router="true"
            size="75">
          <el-menu-item index="/index" style="margin-right:auto;border: none;">
            <img src="/siteico.png" style="width: 35px;margin-top: 5px;">
            <span style="margin-left: 8px;font-size: 16px;color: black;">搬运工</span>
          </el-menu-item>
          <el-menu-item index="/index">
            <span class="iconfont">&#xe7a7;</span>
            主 页
          </el-menu-item>
          <el-menu-item index="/source">
            <span class="iconfont">&#xe64f;</span>
            资 源
          </el-menu-item>
          <el-menu-item  index="/hall">
            <span class="iconfont">&#xe6e9;</span>
            大 厅
          </el-menu-item>
          <el-menu-item index="/account/person">
            <span class="iconfont">&#xe605;</span>
            个 人
          </el-menu-item>
          <el-row class="relative">
            <el-input
                v-model.lazy="searchFrom"
                placeholder="全站搜索~~~"
                @keydown.enter="submitSearch"
                @focus="show = !show" @blur="blurSearch"
                class="input-with-select min-w-120 m-2 mr-4 relative">
              <template #append>
                <el-button @click="submitSearch">
                  <el-icon class="text-xm">
                    <span class="iconfont">&#xe651;</span>
                  </el-icon>
                </el-button>
              </template>
            </el-input>
            <el-collapse-transition class="absolute min-w-120 shadow-md ml-2"
                                    style="top: 50px;z-index: 1000;background:rgb(255,255,255);">
              <div v-show="show">
                <div class="transition-box  ml-2  min-h-10 ">
                  <el-row :gutter="20" class="p-2">
                    <el-col :span="4"><span style="font-size: 10px">搜索历史</span></el-col>
                    <el-col :span="15"></el-col>
                    <el-col :span="5">
                      <el-button @click="empty" link type="primary"
                                 style="font-size: 10px">清空
                      </el-button>
                      <el-button link type="success" style="font-size: 10px"
                                 @click="makeWord">词云
                      </el-button>
                    </el-col>
                  </el-row>
                  <el-scrollbar class="max-h-150">
                    <el-row :gutter="20" class="px-2 pb-2" v-for="(item,index) in historyList" :key="item">
                      <el-col :span="16" @click="selectHistory(item)" class="cursor-pointer">
                        <el-button link style="font-size: 10px">{{ item }}
                        </el-button>
                      </el-col>

                      <el-col :span="4">
                        <el-button link type="primary" style="font-size: 10px"></el-button>
                      </el-col>
                    </el-row>
                  </el-scrollbar>

                </div>
              </div>
            </el-collapse-transition>
          </el-row>
          <el-menu-item index="/account/recommend" class="pl-0">
            <el-divider direction="vertical"/>
            <span class="iconfont" style="color: gold"> &#xe61a;</span>
            推荐
          </el-menu-item>

          <el-menu-item index="/account/person" style="height: 58px">
            <el-dropdown>
              <span class="el-dropdown-link">

                 <el-avatar :size="35" :src="userAvatar" class="bg-blue-500">{{ name.slice(0, 1) }}</el-avatar>
                <el-icon class="el-icon--right mb-1 opacity-90 " style="font-size: 18px">
                     <span class="iconfont">&#xe69b;</span>
                </el-icon>
              </span>
              <template #dropdown v-if="$route.meta.islogin">
                <el-dropdown-menu>
                  <el-dropdown-item @click="$router.push('/account')">
                    <span class="iconfont">&#xe645;</span>
                    个人中心
                  </el-dropdown-item>
                  <el-dropdown-item disabled>
                    <span class="iconfont">&#xe619;</span>
                    消 息
                  </el-dropdown-item>
                  <el-dropdown-item disabled>
                    <span class="iconfont">&#xe8b1;</span>
                    分 享
                  </el-dropdown-item>
                  <el-dropdown-item divided @click="logout">
                    <span class="iconfont">&#xe644;</span>
                    登 出
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="$router.push('/login')">
                    <span class="iconfont">    &#xe6d6;</span>
                    登 入
                  </el-dropdown-item>
                  <el-dropdown-item divided>
                    <span class="iconfont">&#xe8b1;</span>
                    分 享
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-menu-item>

        </el-menu>
      </el-header>
    </el-affix>
    <el-dialog
        v-model="centerDialogVisible"
        title="热搜词云图"
        width="550px"
        style="height: 450px"
        align-center>
      <template #default>
        <iframe src="https://defaultdata-1311013567.cos.ap-nanjing.myqcloud.com/index.html"
                width="100%" scrolling="no"
                height="300px">
          您的浏览器不支持iframe，请升级
        </iframe>

      </template>

    </el-dialog>

    <el-dialog v-model="clearHistory" title="确认删除?" width="30%" center>
      <span>是否清空所有历史记录</span>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeCallback(true)">取消</el-button>
        <el-button type="primary" @click="closeCallback(false)">确认</el-button>
      </span>
      </template>
    </el-dialog>
  </div>

</template>
<script>
import {remove_token} from '@/utils/cookies';
import require_auth from '@/mixins/require_auth'
import {mapMutations} from "vuex";

/*
* todo 导航栏组件
*
* */
export default {
  mixins: [require_auth],
  name: 'header',
  props: {
    status: {
      type: Object,
      default: ''
    }
  },
  data() {
    return {
      clearHistory: false,
      centerDialogVisible: false,
      show: false,
      searchFrom: '',
      historyList: [],//存储搜索历史
      currentPath: '',
    };
  },
  mounted() {

    this.searchFrom = this.$route.query?.search
    this.currentPath = this.$route.fullPath
    //挂在本地的历史搜索记录
    if (JSON.parse(localStorage.getItem('historyList'))) {
      this.historyList = JSON.parse(localStorage.getItem('historyList'));
    }
  },
  computed: {
    name() {
      const user=this.$store.state.Account.user
      if (user !== '') {
        return user.detail.name
      }
      return '登录'
    },
    userAvatar() {
      //是否存在用户头像
      const user=this.$store.state.Account.user
      if (user !== '') {
        return user.detail?.userAvatar
      }
      return ''
    }
  },
  methods: {
    ...mapMutations(['deleteUserData']),
    /**
     * 关闭回调
     * */
    closeCallback(bool) {
      this.clearHistory = false;
    },
    /**
     * 失去焦点时
     * */
    blurSearch() {
      setTimeout(() => {
        this.show = !this.show
      }, 200)
    },
    /**
     * 词云
     */
    makeWord() {
      this.centerDialogVisible = true
    },
    /**
     * 获取历史记录
     */
    get_search() {
      //存储搜索历史

      // 没有搜索记录，把搜索值push进数组首位，存入本地
      let array = []
      for (const aElement of this.historyList) {
        array.push(aElement)
      }
      if (!array.includes(this.searchFrom)) {
        this.historyList.unshift(this.searchFrom);
        localStorage.setItem('historyList', JSON.stringify(this.historyList));
      } else {
        //有搜索记录，删除之前的旧记录，将新搜索值重新push到数组首位
        let i = array.indexOf(this.searchFrom);
        array.splice(i, 1)
        array.unshift(this.historyList);
        localStorage.setItem('historyList', JSON.stringify(this.historyList));
      }
    },
    /**
     * 选择以前的搜索历史
     *
     */
    selectHistory(history) {
      if (history) {
        this.searchFrom = history
        this.submitSearch()
      }
    },
    /**
     * 清空搜索记录
     */
    empty() {
      this.clearHistory = true;
      localStorage.removeItem('historyList');
      this.historyList = [];
    },
    /**
     * 搜索框
     */
    submitSearch() {
      if (!this.searchFrom || this.loginRequire) return;
      if (this.currentPath.startsWith('/type') || this.currentPath.startsWith('/source')) {
        this.$router.replace({
          name: 'source',
          query: {search: this.searchFrom}
        })
      } else {
        let routeUrl = this.$router.resolve({
          path: 'source',
          query: {search: this.searchFrom}
        });
        window.open(routeUrl.href, '_blank')
      }

    },
    /**
     * 登出
     */

    logout() {
      //删除store消息
      this.deleteUserData()
      //删除token
      remove_token();
      //删除浏览器存储
      localStorage.clear()
      location.reload()
    }

  },

}

</script>

<style scoped>
.el-header > .el-menu > .el-menu-item:hover {
  border-bottom: 2px solid #409eff;
  transition-duration: 0.5s;
}

::v-deep .el-input-group__append {
  color: white;
  background-color: #1890ff;

}


</style>
