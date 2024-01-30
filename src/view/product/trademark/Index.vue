<template>
  <el-card class="box-card text">
    <el-button type="primary" size="default" icon="plus">添加品牌</el-button>
    <!-- <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div> -->
    <el-table style="margin: 10px 0" border>
      <el-table-column label="序号" width="80px" align="center" />
      <el-table-column label="品牌名称" align="center" />
      <el-table-column label="品牌logo" align="center" />
      <el-table-column label="操作" align="center" />
    </el-table>
    <template #footer>Footer content</template>
  </el-card>
  <div class="demo-pagination-block">
    <!-- <div class="demonstration">All combined</div> -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 10, 20]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="prev, pager, next, jumper,->,sizes, total"
      :total="10"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :hide-on-single-page="hiddenOnSingle"
      :pager-count="6"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const currentPage = ref(1)
const pageSize = ref(3)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const hiddenOnSingle = ref(false)
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>

<style scoped>
.demo-pagination-block {
  margin-top: 20px;
}
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
