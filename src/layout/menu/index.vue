<template>
  <template v-for="item in menuList" :key="item.path">
    <el-menu-item v-if="!item.children && item.meta.hidden === false" :index="item.path" @click="goRoute">
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
    <el-menu-item v-if="item.children && item.children.length === 1 && item.meta.hidden === false" :index="item.children[0].path" @click="goRoute">
      <el-icon>
        <component :is="item.children[0].meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ item.children[0].meta.title }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu v-if="item.children && item.children.length > 1 && item.meta.hidden === false" :index="item.path">
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
defineProps(['menuList'])
const $router = useRouter()
const goRoute = (path: any) => {
  console.log(path.index)

  $router.push(path.index)
}
</script>

<script script lang="ts">
export default {
  name: 'Menu',
}
</script>

<style scoped>
.menu-selected {
  /* background-color: #e6f7ff; */
}
</style>
