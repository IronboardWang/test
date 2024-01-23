<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout一级路由组件的子路由 -->
      <component :is="Component" v-if="refresh_flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { ref, reactive, watch, nextTick } from 'vue'
import { useLayOutSettingsStore } from '../../store/layout/settings'
let LayOutSettingsStore = useLayOutSettingsStore()
let refresh_flag = ref(true)
watch(
  () => LayOutSettingsStore.refresh,
  (newMessage, newCount) => {
    console.log(newMessage, newCount)
    refresh_flag.value = false
    nextTick(() => {
      refresh_flag.value = true
    })
  },
)
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
