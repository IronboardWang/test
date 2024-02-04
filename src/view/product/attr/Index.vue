<template>
  <div>
    <Category :c1Arr="c1Arr" :c2Arr="c2Arr" :c3Arr="c3Arr" :detailShowScene="detailShowScene" @getC2="getC2" @getC3="getC3" @onSubmit="onSubmit"></Category>
  </div>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>平台属性</span>
        <el-button type="primary" class="button" :disabled="reqAddOrUpdateAttrButton" @click="addAttr">添加属性</el-button>
      </div>
    </template>
    <div v-show="detailShowScene === 0">
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
    </div>
    <div v-show="detailShowScene === 1">
      <el-form :inline="true">
        <el-form-item label="attr name">
          <el-input placeholder="attr name" v-model="attrParams.attrName"> </el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="default" :disabled="attrParams.attrName === '' ? true : false" @click="addAttrValue">添加属性</el-button>
      <el-button size="default" @click="cancelAddAttrValue">取消添加属性</el-button>
      <el-table border style="margin: 10px 0px" :data="attrParams.attrValueList">
        <el-table-column label="序号" type="index" width="80px" align="center" />
        <el-table-column label="属性值名称" align="left" width="500px">
          <template #default="{ row }">
            <div>
              <el-input
                ref="currentInputAttrValue"
                @blur="enterLockMode(row)"
                v-if="row.flag"
                placeholder="please input attr value name"
                v-model="row.valueName"
              ></el-input>
              <div @click="enterEditMode(row)" v-else>{{ row.valueName }}</div>
              <div v-if="row.valueNameInputError !== ''" style="color: red">{{ row.valueNameInputError }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作" align="center">
          <template v-slot="{ row, $index }">
            <el-button type="danger" icon="delete" @click="deleteAttrValue"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" size="default" @click="saveAttr" :disabled="!attrParams.attrValueList.length">保存属性</el-button>
      <el-button size="default" @click="cancelSave">取消保存</el-button>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, nextTick } from 'vue'
import { reqC1, reqC2, reqC3, reqAttr, reqAddOrUpdateAttr, reqRemoveAttr } from '@baseUrl/api/product/attr'
import type { TagProps } from 'element-plus'
import { Attr } from '@baseUrl/api/product/attr/type'
onMounted(() => {
  getC1()
  onSubmit()
})

let c1Arr = ref()
let c2Arr = ref()
let c3Arr = ref()
let attrArr = ref()
let current_c1 = ref(2)
let current_c2 = ref(15)
let current_c3 = ref(69)
let reqAddOrUpdateAttrButton = ref(true)
let detailShowScene = ref(0)
let currentInputAttrValue = ref()
let attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
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

// const onSubmit = async (classFormInline: Ref) => {
const onSubmit = async () => {
  console.log('onSubmit')
  // current_c1.value = classFormInline.value.firstClass
  // current_c2.value = classFormInline.value.secondClass
  // current_c3.value = classFormInline.value.thirdClass
  current_c1.value = 2
  current_c2.value = 15
  current_c3.value = 69
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

const addAttr = () => {
  detailShowScene.value = 1
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3,
  })
}

const handleEditAttr = (row: any) => {
  console.log(row)
  detailShowScene.value = 1
}

const handleDeleteAttr = (row: any) => {
  console.log(row)
}

const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,
    valueNameInputError: '',
  })
  nextTick(() => {
    currentInputAttrValue.value.focus()
  })
}

const cancelAddAttrValue = () => {
  attrParams.attrValueList.pop()
}

const saveAttr = async () => {
  attrParams.categoryId = current_c3.value
  let result = await reqAddOrUpdateAttr(attrParams)
  console.log(result)
  detailShowScene.value = 0

  result = await reqAttr(current_c1.value, current_c2.value, current_c3.value)

  if (result.code === 200) {
    attrArr.value = result.data
    reqAddOrUpdateAttrButton.value = false
  } else {
    reqAddOrUpdateAttrButton.value = true
  }
}

const cancelSave = () => {
  detailShowScene.value = 0
}
const enterLockMode = (row: any) => {
  if (row.valueName.trim() === '') {
    row.valueNameInputError = 'Enter Lock Mode is required value'
    return
  }
  let repeat = attrParams.attrValueList.find(item => {
    if (item !== row && item.valueName === row.valueName.trim()) {
      return true
    }
  })
  if (repeat) {
    row.valueNameInputError = 'valueName duplication'
    return
  }

  row.valueNameInputError = ''
  row.flag = false
}

const enterEditMode = (row: any) => {
  row.flag = true
  nextTick(() => {
    currentInputAttrValue.value.focus()
  })
}

const deleteAttrValue = ($index: any) => {
  attrParams.attrValueList.splice($index, 1)
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
