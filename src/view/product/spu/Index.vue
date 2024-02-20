<template>
  <Category :c1Arr="c1Arr" :c2Arr="c2Arr" :c3Arr="c3Arr" :detailShowScene="detailShowScene" @getC2="getC2" @getC3="getC3" @onSubmit="onSubmit"></Category>
  <el-card>
    <div v-show="scene === showScene.spuList">
      <el-button type="primary" size="default" icon="plus" :disabled="addSpuButtonDisable" @click="addSpu">添加spu</el-button>
      <el-table style="margin: 10px 0px" border :data="spuRecords">
        <el-table-column label="index" width="80px" align="center" type="index"></el-table-column>
        <el-table-column label="id" width="80px" align="center" prop="id"></el-table-column>
        <el-table-column label="spuName" width="120px" prop="spuName"></el-table-column>
        <el-table-column label="description" prop="description"></el-table-column>
        <el-table-column label="操作" width="600px" align="center">
          <template v-slot="{ row, $index }">
            <el-button type="primary" icon="edit" size="small" title="edit spu" @click="editSpu(row)">edit spu</el-button>
            <el-button type="primary" icon="plus" size="small" title="add sku" @click="addSku(row)">add sku</el-button>
            <el-button type="primary" icon="search" size="small" title="查看sku" @click="showSku(row)">查看sku</el-button>
            <el-button type="primary" icon="delete" size="small" title="delete sku" @click="deleteSpu(row)">delete spu</el-button>
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
    </div>
    <SpuForm ref="spuFormRef" v-show="scene === showScene.spuForm" @changeScene="changeScene"></SpuForm>
    <SkuForm ref="skuFormRef" v-show="scene === showScene.skuForm" @changeScene="changeScene"></SkuForm>
    <el-dialog v-model="show" title="SKU列表">
      <el-table :data="skuArr">
        <el-table-column label="SKU名字" prop="skuName"></el-table-column>
        <el-table-column label="SKU价格" prop="price"></el-table-column>
        <el-table-column label="SKU重量" prop="weight"></el-table-column>
        <el-table-column label="SKU图片">
          <template #="{ row, $index }">
            <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { reqC1, reqC2, reqC3, reqRemoveAttr } from '@baseUrl/api/product/attr'
import { reqHasSpu, reqSkuList } from '@baseUrl/api/product/spu'
import { ref, reactive, Ref, onMounted } from 'vue'
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
import { SkuData, SkuInfoData } from '@baseUrl/api/product/spu/type'
import { ElMessage } from 'element-plus'
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

enum showScene {
  spuList = 0,
  spuForm = 1,
  skuForm = 2,
}

let scene = ref<number>(showScene.spuList)

let spuFormRef = ref()
let skuFormRef = ref()

let skuArr = ref<SkuData[]>([])
let show = ref(false)

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
  let result = await reqHasSpu(currentPage.value, pageSize.value, current_c3.value)
  // let result = await reqHasSpu(currentPage.value, pageSize.value, 1)
  spuRecords.value = result.data.records
  addSpuButtonDisable.value = false
  spuTotal.value = result.data.total
}

const addSpu = () => {
  scene.value = showScene.spuForm
  spuFormRef.value.initAddSpu(c3Arr.value)
}
const showSku = async (row: any) => {
  let res: SkuInfoData = await reqSkuList(row.id as number)
  if (res.code === 200) {
    skuArr.value = res.data
    show.value = true
  }
}

const deleteSpu = async (row: any) => {
  let res: any = await reqRemoveAttr(row.id as number)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getSpuList()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
const changeScene = (value: number) => {
  console.log(111)

  scene.value = value
}

const editSpu = (row: any) => {
  changeScene(showScene.spuForm)
  spuFormRef.value.initSpuData(row)
}

const addSku = (row: any) => {
  changeScene(showScene.skuForm)
  skuFormRef.value.initSkuData(current_c1.value, current_c2.value, row)
}
</script>

<style scoped></style>
