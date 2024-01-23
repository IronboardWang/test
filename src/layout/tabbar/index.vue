<template>
  <div class="tabbar">
    <div class="tabber_left">
      <el-icon class="icon" @click="changIcon">
        <Expand v-if="LayOutSettingsStore.fold"></Expand>
        <Fold v-else></Fold>
      </el-icon>
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="_route in $route.matched" :key="_route.meta['title']">{{ _route.meta['title'] }}</el-breadcrumb-item>
        <!-- <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item> -->
      </el-breadcrumb>
    </div>
    <div class="tabber_right">
      <el-button type="primary" size="small" icon="refresh" :circle="true" @click="refresh_main"></el-button>
      <el-button type="primary" size="small" icon="FullScreen" :circle="true" @click="full_main"></el-button>
      <el-button class="last-button" type="primary" size="small" icon="Setting" :circle="true"></el-button>
      <img :src="userStore.avatar" alt="" style="width: 25px; border-radius: 50%" />
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useLayOutSettingsStore } from '../../store/layout/settings'
import { useRoute, useRouter } from 'vue-router'
import useUserStore from '@baseUrl/store/user/user'
import { REMOVE_TOKEN } from '@baseUrl/utils/token'
let userStore = useUserStore()
let LayOutSettingsStore = useLayOutSettingsStore()

const changIcon = () => {
  LayOutSettingsStore.fold = !LayOutSettingsStore.fold
}
let $route = useRoute()
let $router = useRouter()
console.log($route.matched)

const refresh_main = () => {
  LayOutSettingsStore.refresh = !LayOutSettingsStore.refresh
}

const full_main = () => {
  let full = document.fullscreenElement

  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

const logout = () => {
  REMOVE_TOKEN()
  userStore.logout()
  $router.replace({
    path: '/login',
    query: {
      redirect: $route.path,
    },
  })
}
</script>

<style scoped lan="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  /* background-color: red; */
}
.tabber_left,
.tabber_right {
  display: flex;
  align-items: center;
  margin-left: 20px;
  .icon {
    margin-right: 10px;
  }
  .last-button {
    margin-right: 15px;
  }
}
</style>
