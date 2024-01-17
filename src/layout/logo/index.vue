<template>
  <div class="logo" v-if="setting.isHidden">
    <img :src="setting.img_scr" alt="" />
    <span v-if="!useLayOutSettings.fold">{{ setting.title }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import setting from '../../setting/logo'
import { useLayOutSettingsStore } from '../../store/layout/settings'
let useLayOutSettings = useLayOutSettingsStore()
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $logo-height;
  display: flex;
  align-items: center;
  padding: 20px;

  img {
    width: 18px;
    height: 18px;
  }
  span {
    font-size: 20px;
    padding: 20px;
  }
}
</style>
