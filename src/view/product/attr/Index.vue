<template>
  <div>
    <Category :c1Arr="c1Arr" :c2Arr="c2Arr" :c3Arr="c3Arr" @getC2="getC2" @getC3="getC3" @onSubmit="onSubmit"></Category>
  </div>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>平台属性</span>
        <el-button type="primary" class="button" :disabled="reqAddOrUpdateAttrButton" @click="addAttr">添加平台属性</el-button>
      </div>
    </template>
    <el-table border :data="attrArr">
      <el-table-column label="序号" type="index" width="80px" align="center" />
      <el-table-column label="id" width="80px" align="center" prop="id" />
      <el-table-column label="属性名称" align="center" width="80px" prop="attrName" />
      <el-table-column label="属性值名称" align="center" prop="id">
        <template #default="scope">
          <el-tag v-for="(item, index) in scope.row.attrValueList" :key="item.valueName" class="mx-1" effect="light" :type="tag_color_list[index].type">
            <span>{{ item.valueName }}</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200px">
        <template #default="scope">
          <el-button size="small" @click="handleEditAttr(scope.row)">Edit</el-button>
          <el-popconfirm :title="`Are you sure to delete ${scope.row.attrName}?`" @confirm="handleDeleteAttr(scope.row)" icon="Delete">
            <template #reference>
              <el-button size="small" type="danger">Delete</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts" setup>
import { Ref } from 'vue'
import { reqC1, reqC2, reqC3, reqAttr, reqAddOrUpdateAttr, reqRemoveAttr } from '@baseUrl/api/product/attr'
import { onMounted, ref } from 'vue'
import type { TagProps } from 'element-plus'

onMounted(() => {
  getC1()
})

let c1Arr = ref()
let c2Arr = ref()
let c3Arr = ref()
let attrArr = ref()
let current_c1 = ref()
let current_c2 = ref()
let current_c3 = ref()
let reqAddOrUpdateAttrButton = ref(true)

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
  current_c1.value = classFormInline.value.firstClass
  current_c2.value = classFormInline.value.secondClass
  current_c3.value = classFormInline.value.thirdClass
  const result = await reqAttr(current_c1.value, current_c2.value, current_c3.value)

  if (result.code === 200) {
    attrArr.value = result.data
    reqAddOrUpdateAttrButton.value = false
  } else {
    reqAddOrUpdateAttrButton.value = true
  }
}

type Item = { type: TagProps['type'] }

const tag_color_list = ref<Array<Item>>([{ type: '' }, { type: 'success' }, { type: 'info' }, { type: 'danger' }, { type: 'warning' }])

const addAttr = () => {}

const handleEditAttr = (row: any) => {
  console.log(row)
}

const handleDeleteAttr = (row: any) => {
  console.log(row)
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
