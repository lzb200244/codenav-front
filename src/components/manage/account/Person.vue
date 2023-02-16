<template>
  <div>
    <el-main class="p-2" v-if="user!==''">
      <el-row :gutter="10" class="bg-light-50 relative">
        <div class="demo-type m-6 ">

          <el-tooltip content="点击修改信息" placement="bottom">
            <el-avatar
                v-if="userAvatar!=='key'"
                :size="95"
                :src="userAvatar"
                @click="editInfo"
                class="cursor-pointer "
            >
            </el-avatar>

            <el-avatar
                :size="95"
                v-else
                @click="editInfo"
                class="cursor-pointer bg-blue-400">
              <span class="text-3xl"> {{ userDetail?.name?.slice(0, 1) }}</span>
            </el-avatar>

          </el-tooltip>
          <el-tag>{{ user?.score }}</el-tag>
          <el-button
              link
              type="primary"
              class="m-5 absolute right-0 bottom-0" @click="editInfo">编辑信息
          </el-button>
        </div>
      </el-row>

      <el-row :gutter="10" class="mt-6 bg-light-50 p-5">
        <div>
          <el-descriptions
              :column="1"
              size="large"
              direction="horizontal "
              title="个人资料"
              v-if="userDetail"
              style="height: 450px">
            <el-descriptions-item label="昵 称:">{{ userDetail?.name }}</el-descriptions-item>
            <el-descriptions-item label="Q Q:">{{ userDetail?.qq }}</el-descriptions-item>
            <el-descriptions-item label="兴 趣:">
              <el-tag
                  size="small"
                  class="mx-1"
                  type="info"
                  v-for="item in userDetail.habit"
                  :key="item.label">
                {{ item.label }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="职业:">
              <el-tag size="small">School</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="积分:">
              <span>{{ userDetail.score }}</span>
            </el-descriptions-item>

            <el-descriptions-item label="描述信息:"
            >{{ userDetail.message }}
            </el-descriptions-item>
            <el-descriptions-item label="第三方:">
              <el-tag plain v-if="isBind">已绑定</el-tag>
              <el-tag plain v-else @click="BindTencent">绑定QQ</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="注册时间:"
            >{{ userDetail.join_time }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-row>
    </el-main>
    <el-dialog

        v-model="dialogFormVisible"
        title="修改资料"
        :width="windowWidth*0.4+150"
        class="p-4"
        top="20px">
      <el-form v-model="updateInfo">
        <el-form-item label="昵称">
          <el-input v-model="updateInfo.name" autocomplete="off"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Q Q">
          <el-input
              v-model.number="updateInfo.qq"
              autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="类型">
          <my-select :selected="updateInfo.habit" @transfer="selectHabit"/>
        </el-form-item>

        <el-form-item label="头像">
          <el-upload
              class="avatar-uploader"
              :action="baseURL+'/operation/uploadfile'"
              :limit="1"
              :data="{pk:userDetail.pk}"
              :auto-upload="true"
              name="user_img"
              :on-success="handleAvatarSuccess"
              accept=".svgz,.jpg,.jpeg,.ico,.tiff,.gif,.svg,.jfif,.webp,.png,">
            <img v-if="userAvatar" :src="userAvatar" class="avatar"/>
            <el-icon v-else class="avatar-uploader-icon">
              <Plus/>
            </el-icon>
          </el-upload>
          <el-button class="ml-5" @click="drawer = true">
            云图库
          </el-button>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="updateInfo.message"
                    autocomplete="off"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelEditInfo">取消</el-button>
        <el-button type="primary" @click="updateSubmit">更新</el-button>
      </span>
      </template>
    </el-dialog>

    <el-drawer v-model="drawer" title="更换头像" :with-header="false" :size="windowWidth*0.3+50">
      <images @sendImages="setImages" :showText="false" :ImagesList="$store.state?.allSelect?.img.avatar"/>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelImages">取消</el-button>
          <el-button type="primary" @click="  this.drawer = false">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<script>
import axios from 'axios'
import {updateData, bindTencent} from '@/apis/account';
import message from '@/utils/messager';
import images from '@/components/modules/images.vue';
import mySelect from '/src/components/modules/select.vue';
import {mapState} from "vuex";

export default {
  components: {
    images, mySelect
  },
  data() {
    return {
      baseURL: axios.defaults.baseURL,
      windowWidth: document.documentElement.clientWidth,
      drawer: false,
      selected: [],
      userAvatar: '',
      dialogFormVisible: false,
      updateInfo: null,
      tempAvatar: '', //撤回修改头像
      //是否绑定qq
      isBind: "",
      //暗道
      event: ''
    }
  },
  mounted() {
    //store对象
    const query = this.$route.query;

    if (query.code && query.state) {
      //todo QQ登录
      this.$route.query = {} //query:空
      bindTencent(query.code, "post").then(res => {
        message("绑定成功")
        this.isBind = true;
      })
    }
    this.userAvatar = this.userDetail.userAvatar;
    this.isBind = this.userDetail.other //是否绑定第三方
    //用户信息
    this.updateInfo = {}
    document.addEventListener("keypress", (events) => {
      /**
       * 暗道
       */
      this.event += events.key;
      if (this.event.length === 4 && this.event === 'home') {
        window.open('http://43.138.105.186:8888/codeminer-admin/')
      }
      if (this.event.length > 4) {
        this.event = '';
      }
    })
  },
  computed: {
    ...mapState(['user']),
    userDetail() {
      if (this.$store.state.user === '') {
        return ''
      }
      return this.$store.state.user?.detail;
    }
  },
  methods: {
    /**
     *取消编辑
     * 头像还原
     */
    cancelEditInfo() {
      this.userAvatar = this.tempAvatar
      this.dialogFormVisible = false

    },
    /**
     *
     * 处理爱好选择
     */
    selectHabit(val) {

      this.selected = Object.values(val)
    },
    /**
     *编辑个人信息
     */
    editInfo() {
      //存储当前头像
      /**
       * 处理空
       **/
      this.updateInfo = {...this.userDetail,}
      this.tempAvatar = this.userAvatar = this.updateInfo.userAvatar;
      this.dialogFormVisible = true
    },
    BindTencent() {
      /**
       * 绑定qq
       */
      bindTencent(undefined, "get").then((res) => {
        window.open(res.data, '_blank')
      })
    },
    cancelImages() {
      this.drawer = false;
    },
    setImages(value) {
      this.userAvatar = value;
    },
    /**
     * 上传头像
     * */
    handleAvatarSuccess(response) {

      this.userAvatar = response;
      message('上传成功');
    },
    /**
     *   提交修改个人信息
     */
    updateSubmit() {
      this.updateInfo.habit = this.selected
      this.updateInfo.userAvatar = this.userAvatar
      updateData(this.updateInfo).then((res) => {
        message('更新成功!!');
        this.$store.commit("saveUser", res.data)
      })
    }

  }
}


</script>


<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  /*图片周围小小波浪线*/
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  /*上传图片的icon*/
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  text-align: center;
}

.avatar-uploader .avatar {
  width: 120px;
  height: 120px;
  display: block;
}

</style>
