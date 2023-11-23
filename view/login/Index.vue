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
            <el-button class="login-btn" type="primary" @click="onSubmit">登录</el-button>
            <!-- <el-button>Cancel</el-button> -->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
let loginForm = reactive({
  username: '',
  password: '',
})

const onSubmit = () => {}
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
