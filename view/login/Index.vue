<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login-form">
          <h1>hello</h1>
          <h2>welcome to ggyx</h2>
          <el-form-item>
            <el-input v-model="loginForm.username" :prefix-icon="User" placeholder="Please input username" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="loginForm.password" :prefix-icon="Lock" type="password" placeholder="Please input password" show-password />
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" type="primary" @click="login" :loading="login_btn_loading">登录</el-button>
            <!-- <el-button>Cancel</el-button> -->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@baseUrl/store/user/user'
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTimePeriod } from '../../src/utils/time.ts'

let useUser = useUserStore()
let loginForm = reactive({
  username: '',
  password: '',
})
let login_btn_loading = ref(false)
const $router = useRouter()
const login = async () => {
  login_btn_loading.value = true
  try {
    await useUser.userLogin(loginForm.username, loginForm.password)
    const timePeriod = getTimePeriod()
    ElNotification({
      type: 'success',
      title: '登录成功',
      message: timePeriod + ', ' + loginForm.username,
    })
    $router.push({
      name: 'home',
    })
    login_btn_loading.value = false
  } catch (error) {
    login_btn_loading.value = false
    ElNotification({
      type: 'error',
      title: error.data.message,
    })
    console.log(error.data.message)
  }
  //
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('../../src/assets/images/background.jpg') no-repeat;
  background-size: cover;
}
.login-form {
  width: 80%;
  top: 30vh;
  position: relative;
  padding: 40px;
  background: url('../../src/assets/images/login_form.png') no-repeat;
  background-size: cover;
  h1 {
    color: aliceblue;
    font-size: 40px;
  }
  h2 {
    margin-top: 10px;
    margin-bottom: 10px;
    color: aliceblue;
    font-size: 20px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
