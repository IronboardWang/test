<template>
  <div>
    <Category :c1Arr="c1Arr" :c2Arr="c2Arr" :c3Arr="c3Arr" @getC2="getC2" @getC3="getC3" @onSubmit="onSubmit"></Category>
  </div>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>平台属性</span>
        <el-button type="primary" class="button">添加平台属性</el-button>
      </div>
    </template>
    <el-table border>
      <el-table-column label="序号" type="index" width="80px" align="center" />
      <el-table-column label="id" width="80px" align="center" />
      <el-table-column label="属性名称" align="center" width="80px" />
      <el-table-column label="属性值名称" align="center" />
      <el-table-column label="操作" align="center" width="80px" />
    </el-table>
    <template #footer>Footer content</template>
  </el-card>
</template>

<script lang="ts" setup>
import { Ref } from 'vue'
import { reqC1, reqC2, reqC3, reqAttr, reqAddOrUpdateAttr, reqRemoveAttr } from '@baseUrl/api/product/attr'
import { onMounted, ref } from 'vue'

onMounted(() => {
  getC1()
})

let c1Arr = ref()
let c2Arr = ref()
let c3Arr = ref()
const getC1 = async () => {
  const result = await reqC1()
  console.log(result)
  c1Arr.value = result.data
}

const getC2 = async (category1Id: string) => {
  if (category1Id !== '') {
    const result = await reqC2(category1Id)
    console.log(result)
    c2Arr.value = result.data
  }
}

const getC3 = async (category2Id: string) => {
  if (category2Id !== '') {
    const result = await reqC3(category2Id)
    console.log(result)
    c3Arr.value = result.data
  }
}

const onSubmit = async (classFormInline: Ref) => {
  console.log('onSubmit')
  const result = await reqAttr(classFormInline.value.firstClass, classFormInline.value.secondClass, classFormInline.value.thirdClass)
  console.log(result)
}
</script>
<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 80%;
  margin: 10px 0;
}
.class-form-inline .el-input {
  --el-input-width: 220px;
}

.class-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
