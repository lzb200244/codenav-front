<template>
  <div class="bg ">
    <el-container class="relative ">
      <el-header height="10"></el-header>
      <el-main>
        <el-form
            label-position="top"
            label-width="150px"
            class=" min-w-95 max-w-95 min-h-155 max-h-155  container mx-auto shadow-md p-5 pt-6  mt-5"
            style="max-width: 280px;background:rgba(255,255,255,0.82);"
            :rules="requireValid? rules:emailRules"
            :model="LoginForm"
            ref="formNode">
          <h1 class="text-3xl text-center mb-6">{{ tabActive }}</h1>
          <el-tabs v-model="tabActive" @tab-click="handleClick" class="demo-tabs" stretch>

            <el-tab-pane label="账密登录" name="账密登录">
              <el-form-item label="账号" prop="username">

                <el-input placeholder="请输入账号或邮箱"
                          size="large" v-model.trim="LoginForm.username">
                  <template #prefix>
                    <span class="iconfont">&#xe645;</span>
                  </template>
                </el-input>

              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input size="large" placeholder="请输入密码"
                          v-model.trim="LoginForm.password" show-password type="password">
                  <template #prefix>
                    <span class="iconfont">&#xe6c0;</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="邮箱登录" name="邮箱登录">
              <el-form-item label="邮箱" prop="loginemail">
                <el-input placeholder="请输入邮箱"
                          size="large" v-model.trim="LoginForm.loginemail">
                  <template #prefix>
                    <span class="iconfont">&#xe645;</span>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="验证码">
                <el-input
                    maxlength="6"
                    class="max-w-50 mr-5" size="large" placeholder="请输入验证码" v-model.trim="LoginForm.code">
                  <template #prefix>
                    <span class="iconfont">&#xe643;</span>
                  </template>
                </el-input>
                <el-button size="large" @click="sendCode" :disabled="disabled">{{ code }}</el-button>
              </el-form-item>

            </el-tab-pane>
          </el-tabs>
          <div class="min-h-20">
            <el-divider>
              <span style="color: #666;font-size: 12px">第三方登录</span>
            </el-divider>
            <div style="float: right;">
              <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="微信登入"
                  show-after="300"
                  placement="top"
              >
                <el-avatar
                    :size="35"
                    alt="微信登入"
                    class="mx-2"
                    style="background:white;border: 1px solid rgba(253,223,223,0.85);padding: 6px;"
                    src="https://tse4-mm.cn.bing.net/th/id/OIP-C.gUehcVKOkOuxjmEbQfgHzwHaHa?pid=ImgDet&rs=1"
                />
              </el-tooltip>


              <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="QQ登录"
                  show-after="300"
                  placement="top"
              >
                <el-avatar
                    :size="35"
                    @click="qqLogin"
                    alt="QQ登入"
                    style="background:white;border: 1px solid rgba(253,223,223,0.85);padding: 6px;"
                    src="https://wiki.connect.qq.com/wp-content/uploads/2013/10/03_qq_symbol-1-250x300.png"
                />
              </el-tooltip>

            </div>
          </div>
          <el-form-item>
            <el-button class="min-w-85 " size="large" type="primary" @click="onSubmit($event)" :loading="loading">登录
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button size="large" @click="this.$router.push('/register')" class="min-w-85 ">注册</el-button>
          </el-form-item>
        </el-form>
      </el-main>
      <navFooter/>
    </el-container>
  </div>

</template>


<script>
import rules, {emailRules} from '@/validations/registerRules'
import {login, tencentLogin, bindTencent} from '@/apis/account';
import {sendEmailCode} from '@/apis/operation';
import message from '@/utils/messager';
import {set_token, remove_token} from '@/utils/cookies';


export default {
  data() {
    return {
      rules,
      emailRules,
      LoginForm: {
        username: '',
        password: '',
        email: '',
        code: '',
        loginemail: ''
      },
      tabActive: '账密登录',
      requireValid: true,
      code: '获取验证码',
      disabled: false,
      loading: false,
      captchaobj: ''
    }
  },
  mounted() {
    remove_token();
    let query = this.$route.query;
    if (query.code && query.state) {
      //todo QQ登录
      this.$router.replace({query: {}})
      tencentLogin(query.code).then(res => {
        return this.LoginSuccess(res)
      })
    }

  },
  methods: {
    /**
     * 登录成功
     * */
    LoginSuccess(res) {
      message('登入成功');
      //存储token
      set_token('code-token', res.data.token);
      this.$router.push('/index');
    },
    /**
     * 登录
     * */
    onSubmit() {
      this.$refs.formNode.validate((valid) => {
        if (!valid) {
          return false
        }
        this.loading = true;
        login(this.LoginForm)
            .then((res) => {
              this.LoginSuccess(res)
            })
            .finally(() => {
              this.loading = false;
            });
      });

    },
    /**
     * qq登录
     */
    qqLogin() {
      bindTencent(undefined, 'get').then((response) => {
        window.open(response.data, '_self')
      })
    },
    /**
     * 选项狼切换
     */
    handleClick(tab, event) {
      switch (tab.props.name) {
        case '邮箱登录' :
          this.LoginForm.username = '';
          this.LoginForm.password = '';
          this.requireValid = false
          break
        case '账密登录':
          this.LoginForm.loginemail = '';
          this.requireValid = true
          break
      }

    },
    /**
     * 倒计时验证码
     */
    sendCode() {
      this.$refs.formNode.validate((valid) => {
        if (!valid) {
          return false
        }
        //发送邮箱
        let that = this;
        console.log(this.LoginForm)
        sendEmailCode(this.LoginForm).then((response) => {
          if (response.code !== 1000) {
            message(response.msg, 'warning')
            return false
          } else {
            let t = 59;
            that.disabled = true
            that.code = '60s重新发送';
            let remind = setInterval(function () {
              that.code = t + 's重新发送';
              t--;
              if (t < 1) {
                that.disabled = false
                clearInterval(remind);
                that.code = '重新获取'
              }
            }, 1000)
          }
        })
      })
    },
  },
}
</script>
<style scoped lang="scss">

::v-deep.el-tabs__nav-scroll {
  width: 50% !important;
  margin: 0 auto !important;
}


.inp {
  border: 1px solid gray;
  padding: 0 10px;
  width: 200px;
  height: 30px;
  font-size: 18px;
}

.bg {
  min-height: 100%;
  background: #f0f2f5 url(/bg.svg) no-repeat 50%;
  background-size: 100%;
  padding: 20px 0;
  position: relative;
}

#captcha {
  width: 340px;
}

.btn {
  border: 1px solid gray;
  width: 100px;
  height: 30px;
  font-size: 18px;
  cursor: pointer;
}

#embed-captcha {
  width: 300px;
  margin: 0 auto;
}

.show {
  display: block;

}


/* 以下遮罩层为demo.用户可自行设计实现 */
#mask {
  display: none;
  position: fixed;
  text-align: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
}

/* 可自行设计实现captcha的位置大小 */
.popup-mobile {
  position: relative;
}

#popup-captcha-mobile {
  position: fixed;
  display: none;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  z-index: 9999;
}

</style>
