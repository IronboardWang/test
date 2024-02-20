<template>
  <el-form label-width="100px ">
    <el-form-item label="sku name">
      <el-input placeholder="sku name" v-model="skuParams.skuName"></el-input>
    </el-form-item>
    <el-form-item label="sku price">
      <el-input placeholder="sku price" type="number" v-model="skuParams.price"></el-input>
    </el-form-item>
    <el-form-item label="sku weight(g)">
      <el-input placeholder="sku weight" type="number" v-model="skuParams.weight"></el-input>
    </el-form-item>
    <el-form-item label="sku desc">
      <el-input placeholder="sku desc" type="textarea" v-model="skuParams.skuDesc"></el-input>
    </el-form-item>
    <el-form-item label="sku attribute">
      <el-form :inline="true">
        <el-form-item v-for="item in attrArr" :key="item.id" :label="item.attrName">
          <el-select v-model="item.attrIdAndValueId">
            <el-option
              :value="`${item.id}:${attrValue.id}`"
              :label="attrValue.valueName"
              v-for="attrValue in item.attrValueList"
              :key="attrValue.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="sales name">
      <el-form :inline="true">
        <el-form-item :label="item.saleAttrName" v-for="(item, index) in saleArr" :key="item.id">
          <el-select v-model="item.saleIdAndValueId">
            <el-option
              :value="`${item.id}:${saleAttrValue.id}`"
              :label="saleAttrValue.saleAttrValueName"
              v-for="(saleAttrValue, index) in item.spuSaleAttrValueList"
              :key="saleAttrValue.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="img name">
      <el-table border :data="imgArr" ref="table">
        <el-table-column type="selection" width="80px" align="center"></el-table-column>
        <el-table-column label="img">
          <template v-slot="{ row, $index }">
            <img :src="row.imgUrl" alt="" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="name">
          <template v-slot="{ row }">
            <span>{{ row.imgName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="operator" width="300px">
          <template v-slot="{ row, $index }">
            <el-button type="primary" size="small" @click="handler(row)"> 设置默认 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default" @click="save">save</el-button>
      <el-button size="default" @click="cancel">cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
const $emit = defineEmits(['changeScene'])
import { reqAttr } from '@baseUrl/api/product/attr'
import { reqAddSku, reqSpuHasSaleAttr, reqSpuImageList } from '@baseUrl/api/product/spu'
import { SkuData } from '@baseUrl/api/product/spu/type'
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'

let attrArr = ref<any>([])
let saleArr = ref<any>([])
let imgArr = ref<any>([])
let table = ref<any>()
let skuParams = reactive<SkuData>({
  category3Id: '',
  spuId: '',
  tmId: '',
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuAttrValueList: [
    // {
    //   attrId: '',
    //   valueId: '',
    // },
  ],
  skuSaleAttrValueList: [
    // {
    //   saleAttrId: '',
    //   saleAttrValueId: '',
    // },
  ],
  skuDefaultImg: '',
})

const save = async () => {
  skuParams.skuAttrValueList = attrArr.value.reduce((accumulator: any, currentValue: any) => {
    if (currentValue.attrIdAndValueId) {
      let [attrId, valueId] = currentValue.attrIdAndValueId.split(':')
      accumulator.push({
        attrId,
        valueId,
      })
    }
    return accumulator
  }, [])
  skuParams.skuSaleAttrValueList = saleArr.value.reduce((prev: any, next: any) => {
    if (next.saleIdAndValueId) {
      let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
      prev.push({
        saleAttrId,
        saleAttrValueId,
      })
    }
    return prev
  }, [])

  let res = await reqAddSku(skuParams)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '添加SKU成功',
    })
    $emit('changeScene', { flag: 0, params: '' })
  } else {
    ElMessage({
      type: 'error',
      message: '添加SKU失败',
    })
  }
}
const cancel = () => {
  $emit('changeScene', 0)
}

const initSkuData = async (c1Id: number | string, c2Id: number | string, spu: any) => {
  skuParams.category3Id = spu.category3Id
  skuParams.spuId = spu.id
  skuParams.tmId = spu.tmId
  let res: any = await reqAttr(c1Id, c2Id, spu.category3Id)
  let res1: any = await reqSpuHasSaleAttr(spu.id)
  let res2: any = await reqSpuImageList(spu.id)
  attrArr.value = res.data
  saleArr.value = res1.data
  imgArr.value = res2.data
}

const handler = (row: any) => {
  imgArr.value.forEach((item: any) => {
    table.value.toggleRowSelection(item, false)
  })
  table.value.toggleRowSelection(row, true)
  skuParams.skuDefaultImg = row.imgUrl
}

defineExpose({
  initSkuData,
})
</script>

<style scoped></style>
