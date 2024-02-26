<script setup lang="ts">
import { useRoute } from 'vue-router'
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import useUserStore from '@baseUrl/store/user/user'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import { useLayOutSettingsStore } from '../store/layout/settings'
let useLayOutSettings = useLayOutSettingsStore()
let userStore = useUserStore()
let $route = useRoute()
</script>

<template>
  <div class="layout_container">
    <!-- <h1>first router</h1> -->
    <div class="layout_slider" :class="{ fold: useLayOutSettings.fold ? true : false }">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu :default-active="$route.path" :collapse="useLayOutSettings.fold">
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_top" :class="{ fold: useLayOutSettings.fold ? true : false }">
      <Tabbar></Tabbar>
    </div>
    <div class="layout_main" :class="{ fold: useLayOutSettings.fold ? true : false }">
      <Main></Main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout_container {
  // background-color: white;
  width: 100%;
  height: 100vh;
  //   position: relative;
  .layout_slider {
    width: $base-menu-width;
    // background-color: white;
    height: 100vh;
    border-right: 1px solid gray;
    transition: all 0.3;

    &.fold {
      width: 50px;
    }
  }
  .layout_top {
    width: calc(100% - $base-menu-width);
    position: fixed;
    top: 0;
    left: $base-menu-width;
    // background-color: gray;
    height: $base-home-top-height;
    transition: all 0.3;
    &.fold {
      width: calc(100% - 50px);
      left: 50px;
    }
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-home-top-height);
    left: $base-menu-width;
    top: $base-home-top-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3;

    &.fold {
      width: calc(100% - 50px);
      left: 50px;
    }
  }
}
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
.scrollbar {
  height: calc(100vh - $logo-height);
}
</style>
