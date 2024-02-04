<template>
  <Category :c1Arr="c1Arr" :c2Arr="c2Arr" :c3Arr="c3Arr" :detailShowScene="detailShowScene" @getC2="getC2" @getC3="getC3" @onSubmit="onSubmit"></Category>
  <el-card>
    <el-button type="primary" size="default" icon="plus" :disabled="addSpuButtonDisable">添加spu</el-button>
    <el-table style="margin: 10px 0px" border :data="spuRecords">
      <el-table-column label="index" width="80px" align="center" type="index"></el-table-column>
      <el-table-column label="id" width="80px" align="center" prop="id"></el-table-column>
      <el-table-column label="spuName" width="120px" prop="spuName"></el-table-column>
      <el-table-column label="description" prop="description"></el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <template v-slot="{ row, $index }">
          <el-button type="primary" icon="plus" size="small" title="add sku"></el-button>
          <el-button type="primary" icon="edit" size="small" title="add sku"></el-button>
          <el-button type="primary" icon="search" size="small" title="add sku"></el-button>
          <el-button type="primary" icon="delete" size="small" title="add sku"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="spu-pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        layout="prev, pager, next, jumper,sizes,->,total "
        :total="spuTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { reqC1, reqC2, reqC3 } from '@baseUrl/api/product/attr'
import { reqHasSpu } from '@baseUrl/api/product/spu'
import { ref, reactive, Ref, onMounted } from 'vue'

let c1Arr = ref()
let c2Arr = ref()
let c3Arr = ref()
let current_c1 = ref()
let current_c2 = ref()
let current_c3 = ref()
let detailShowScene = ref(0)

let currentPage = ref(1)
let pageSize = ref(3)
let spuTotal = ref(0)

let spuRecords = ref()

let addSpuButtonDisable = ref(true)
const handleSizeChange = () => {
  getSpuList()
}
const handleCurrentChange = () => {
  getSpuList()
}
onMounted(() => {
  getC1()
  getSpuList()
})
const getC1 = async () => {
  const result = await reqC1()
  console.log(result)
  c1Arr.value = result.data
}
const getC2 = async (category1Id: string) => {
  if (category1Id !== '') {
    const result = await reqC2(category1Id)
    c2Arr.value = result.data
  }
}

const getC3 = async (category2Id: string) => {
  if (category2Id !== '') {
    const result = await reqC3(category2Id)
    c3Arr.value = result.data
  }
}
const onSubmit = (classFormInline: Ref) => {
  current_c1.value = classFormInline.value.firstClass
  current_c2.value = classFormInline.value.secondClass
  current_c3.value = classFormInline.value.thirdClass
  getSpuList()
}

const getSpuList = async () => {
  // let result = await reqHasSpu(currentPage.value, pageSize.value, current_c3.value)
  let result = await reqHasSpu(currentPage.value, pageSize.value, 1)
  spuRecords.value = result.data.records
  addSpuButtonDisable.value = false
  spuTotal.value = result.data.total
  console.log(spuRecords.value)
}
</script>

<style scoped></style>
