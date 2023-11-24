<script setup lang="ts">
import request from './utils/request'
import { onMounted } from 'vue'

// onMounted(() => {
//   request({
//     url: 'api/user/login',
//     method: 'POST',
//     data: {
//       username: 'admin',
//       password: '111111',
//     },
//   }).then(res => {
//     console.log(res)
//   })
// })
</script>

<template>
  <router-view></router-view>
  <!-- <h1>111</h1> -->
  <!-- <svgIcon name="home" width="200px" height="200px"></svgIcon>
  <svg>
    <use xlink:href="#icon-vue"></use>
  </svg>
  <hr /> -->
</template>

<style scoped lang="scss">
h1 {
  color: $color;
}
</style>
