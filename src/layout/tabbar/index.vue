<template>
  <div class="tabbar">
    <div class="tabber_left">
      <el-icon class="icon" @click="changIcon">
        <Expand v-if="LayOutSettingsStore.fold"></Expand>
        <Fold v-else></Fold>
      </el-icon>
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        <el-breadcrumb-item>promotion management</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabber_right">
      <el-button type="primary" size="small" icon="refresh" :circle="true"></el-button>
      <el-button type="primary" size="small" icon="FullScreen" :circle="true"></el-button>
      <el-button class="last-button" type="primary" size="small" icon="Setting" :circle="true"></el-button>
      <img :src="setting.img_scr" alt="" style="width: 25px" />
      <el-dropdown>
        <span class="el-dropdown-link">
          admin
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import setting from '../../setting/logo'
import { useLayOutSettingsStore } from '../../store/layout/settings'
let LayOutSettingsStore = useLayOutSettingsStore()
const changIcon = () => {
  LayOutSettingsStore.fold = !LayOutSettingsStore.fold
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
