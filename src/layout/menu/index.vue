<template>
  <template v-for="item in menuList" :key="item.path">
    <el-menu>
      <el-menu-item v-if="!item.children && item.meta.hidden === false" :index="item.path">
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
      <el-menu-item v-if="item.children && item.children.length === 1 && item.meta.hidden === false" :index="item.path">
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
      <el-sub-menu v-if="item.children && item.children.length > 1 && item.meta.hidden === false" :index="item.path">
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </el-menu>
  </template>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
defineProps(['menuList'])
</script>

<script script lang="ts">
export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Menu',
}
</script>

<style scoped></style>
