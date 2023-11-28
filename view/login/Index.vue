<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form ref="ruleFormRef" class="login-form" :model="loginForm" :rules="rules">
          <h1>hello</h1>
          <h2>welcome to ggyx</h2>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" :prefix-icon="User" placeholder="Please input username" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" :prefix-icon="Lock" type="password" placeholder="Please input password" show-password />
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" type="primary" @click="login(ruleFormRef)" :loading="login_btn_loading">登录</el-button>
            <!-- <el-button>Cancel</el-button> -->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '../../src/store/user/user'
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification, FormInstance, FormRules } from 'element-plus'
import { getTimePeriod } from '../../src/utils/time'

let useUser = useUserStore()
let loginForm = reactive({
  username: '',
  password: '',
})
let login_btn_loading = ref(false)
const $router = useRouter()
const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const validatorUsername = (rule: any, value: any, callback: any) => {
  if (value.length === 0) {
    callback(new Error('请输入账号'))
  } else if (value.length > 10 || value.length < 3) {
    callback(new Error('username must be 3-10'))
  } else {
    callback()
  }
}
const ruleFormRef = ref<FormInstance>(null)
console.log(ruleFormRef)

const rules = reactive({
  username: [{ validator: validatorUsername }],
  password: [
    { required: true, message: 'Please input user name', trigger: 'blur' },
    { min: 6, max: 18, message: 'Length should be 6 to 18', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
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
