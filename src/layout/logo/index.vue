<template>
  <div class="logo" v-if="setting.isHidden">
    <img :src="setting.img_scr" alt="" />
    <span>{{ setting.title }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import setting from '../../setting/logo'
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $logo-height;
  display: flex;
  align-items: center;
  padding: 20px;

  img {
    width: 40px;
    height: 40px;
  }
  span {
    font-size: 20px;
    padding: 20px;
  }
}
</style>
