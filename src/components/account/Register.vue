<template>
  <div class="common-layout ">
    <el-container>

      <el-main class="z-1">
        <el-form
            label-position="top"
            label-width="150px"
            class=" min-w-95 max-w-90 min-h-155 max-h-155  container mx-auto shadow-md p-5 pt-6  mt-5"
            style="max-width: 280px;background:white;"
            :rules="rules"
            :model="Register"
            ref="formNode"
        >
          <h1 class="text-3xl text-center mb-6">注 册</h1>

          <el-form-item label="账号" prop="username">
            <el-input placeholder="请输入账号" size="large" v-model.trim="Register.username">
              <template #prefix>
                <span class="iconfont">&#xe645;</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input placeholder="请输入密码" size="large" v-model.trim="Register.password" show-password type="password">
              <template #prefix>
                <span class="iconfont">&#xe6c0;</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码" size="large" prop="password">
            <el-input placeholder="请输入确认密码" v-model.trim="Register.re_password" show-password type="password">
              <template #prefix>
                <span class="iconfont">&#xe6c0;</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="邮箱 " size="large" prop="email">
            <el-input placeholder="请输入邮箱" v-model.trim="Register.email">
              <template #prefix>
                <span class="iconfont">&#xe69f;</span>
              </template>
            </el-input>
          </el-form-item>
          <div class="min-h-10">
          </div>
          <el-form-item>
            <el-button size="large" class="min-w-85 " type="primary" @click="onSubmit" :loading="loading">注册</el-button>
          </el-form-item>
          <el-form-item>
            <el-button size="large" class="min-w-85 " @click="router.push('/login')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-main>
      <navFooter/>
    </el-container>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router';
import message from '@/utils/messager';
import {onBeforeUnmount, onMounted, reactive, ref} from 'vue'
import {register} from '@/apis/account';


const router = useRouter();
const Register = reactive({
  username: '',
  password: '',
  re_password: '',
  email: '',
})
//校验
const formNode = ref(null);//变成响应式的
const loading = ref(false);
/**
 * 注册提交
 */
const onSubmit = () => {
  formNode.value.validate((valid) => {
    if (!valid) {
      return false
    }
    loading.value = true;
    //接口
    register(Register)
        .then(res => {
          message('注册成功')
          router.push('/login');
        })
        .finally(() => {
          loading.value = false;
        })
  })
}
/**
 * 键盘事件
 * @param e
 */
const onKeyUp = (e) => {
  if (e.key === 'Enter') {
    onSubmit();
  }
}
onMounted(() => {
  document.addEventListener('keyup', onKeyUp)
})

onBeforeUnmount(() => {
  //钩子函数卸载之前加载keyup事件
  document.removeEventListener('keyup', onKeyUp);
})
</script>

<style scoped>

</style>
