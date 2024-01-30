<template>
  <!-- {{ trademark }} -->
  <el-card class="box-card text">
    <el-button type="primary" size="default" icon="plus">添加品牌</el-button>
    <el-table style="margin: 10px 0" border :data="trademark">
      <el-table-column label="序号" width="80px" align="center" prop="id" />
      <el-table-column label="品牌名称" align="center" prop="tmName" />
      <el-table-column label="品牌logo" align="center">
        <template v-slot="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 40px; height: 40px" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default>
          <el-button size="small" @click="handleEdit">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 10, 20]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="prev, pager, next, jumper,->,sizes, total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-count="6"
      />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { reqHasTrademark } from '@baseUrl/api/product/trademark/index'
import { Records } from '@baseUrl/api/product/trademark/type'
let currentPage = ref(1)
let pageSize = ref(3)
let small = ref(false)
let background = ref(false)
let disabled = ref(false)
let total = ref<number>(0)
let trademark = ref<Records>([])
// const hiddenOnSingle = ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

const getHasTrademark = async () => {
  let data = { page: 1, limit: pageSize.value }
  const res = await reqHasTrademark(data)
  console.log(res)
  if (res.code === 200) {
    total.value = res.data.total
    trademark.value = res.data.records
    console.log(trademark)
  }
}

const handleEdit = () => {}

const handleDelete = () => {}

onMounted(() => {
  getHasTrademark()
})
</script>

<style scoped>
.demo-pagination-block {
  margin: 20px 0;
  margin-right: 40px;
}
</style>
