<script setup lang="ts">
import Logo from './logo/index.vue'
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <div class="layout_container">
    <!-- <h1>first router</h1> -->
    <div class="layout_slider">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <!-- <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group title="Group One">
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>item four</template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu> -->
          <el-menu-item index="1">
            <el-icon><location /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><location /></el-icon>
            <span>数据大屏</span>
          </el-menu-item>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><location /></el-icon>
              <span>权限管理</span>
            </template>
            <el-menu-item index="3-1">
              <el-icon><location /></el-icon>
              <span>3-1</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <el-icon><location /></el-icon>
              <span>3-2</span>
            </el-menu-item>
            <el-menu-item index="3-3">
              <el-icon><location /></el-icon>
              <span>3-3</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_top">2</div>
    <div class="layout_main">3</div>
  </div>
</template>

<style scoped lang="scss">
.layout_container {
  background-color: white;
  width: 100%;
  height: 100vh;
  //   position: relative;
  .layout_slider {
    width: $base-menu-width;
    background-color: white;
    height: 100vh;
  }
  .layout_top {
    width: calc(100% - $base-menu-width);
    position: fixed;
    top: 0;
    left: $base-menu-width;
    background-color: cyan;
    height: $base-home-top-height;
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-home-top-height);
    background-color: green;
    left: $base-menu-width;
    top: $base-home-top-height;
    padding: 20px;
    overflow: auto;
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
