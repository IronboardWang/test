<template>
  <el-card>
    <div class="box">
      <img :src="avatar" alt="" />
      <div>
        <h3 class="title">{{ timePeriod }}好, {{ username }}</h3>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import useUserStore from '@baseUrl/store/user/user'
import { getTimePeriod } from '@baseUrl/utils/time'

let userStore = useUserStore()
const avatar = userStore.avatar
const username = userStore.username
console.log(userStore)
const timePeriod = getTimePeriod()
</script>

<style scoped lang="scss">
.box {
  display: flex;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .title {
    font-size: 40px;
    margin-bottom: 20px;
  }
}
</style>
