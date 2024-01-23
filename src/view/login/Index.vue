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
            <el-button class="login-btn" type="primary" @click="login" :loading="login_btn_loading">登录</el-button>
            <!-- <el-button>Cancel</el-button> -->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '../../store/user/user'
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'

let useUser = useUserStore()
let loginForm = reactive({
  username: '',
  password: '',
})
const ruleFormRef = ref(null)

let login_btn_loading = ref(false)
const $router = useRouter()
const $route = useRoute()

const login = async () => {
  await ruleFormRef.value.validate(async (valid: any, fields: any) => {
    if (valid) {
      login_btn_loading.value = true
      try {
        await useUser.userLogin(loginForm)
        console.log($route.query.redirect)
        const redirect: any = $route.query.redirect
        if (redirect) {
          $router.push({ path: redirect })
        } else {
          $router.push('/home')
        }

        ElNotification({
          type: 'success',
          message: '登陆成功',
          title: `Hi, 你好`,
        })
        login_btn_loading.value = false
      } catch (e) {
        console.log(e)
        ElNotification({
          type: 'error',
          message: e.data.message,
          title: `登录失败`,
        })
        login_btn_loading.value = false
      }
    } else {
      console.log('error submit!', fields)
      return null
    }
  })
}

const validatorUsername = (_rule: any, value: any, callback: any) => {
  if (value.length === 0) {
    callback(new Error('请输入账号'))
  } else if (value.length > 10 || value.length < 3) {
    callback(new Error('username must be 3-10'))
  } else {
    callback()
  }
}

const rules = reactive({
  username: [{ validator: validatorUsername, trigger: 'blur' }],
  password: [
    { required: true, message: 'Please input user name', trigger: 'blur' },
    { min: 6, max: 18, message: 'Length should be 6 to 18', trigger: 'blur' },
  ],
})
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('../../assets/images/background.jpg') no-repeat;
  background-size: cover;
}
.login-form {
  width: 80%;
  top: 30vh;
  position: relative;
  padding: 40px;
  background: url('../../assets/images/login_form.png') no-repeat;
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
