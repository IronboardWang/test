<template>
  <div>home</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useUserStore from '@baseUrl/store/user/user'

let userStore = useUserStore()

onMounted(() => {
  userStore.userInfo()
})
</script>

<style scoped></style>
