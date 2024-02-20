<template>
  <el-form style="width: 60%; min-width: 178px; margin: 10px 20px" label-position="left" label-width="150px">
    <el-form-item label="spuName">
      <el-input placeholder="please input spuName" v-model="SpuParams.spuName"></el-input>
    </el-form-item>
    <el-form-item label="spu brand">
      <el-select v-model="SpuParams.tmId">
        <el-option v-for="trademark in allTradeMark" :key="trademark.id" :label="trademark.tmName" :value="trademark.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="spu description">
      <el-input type="textarea" placeholder="please input spu description" v-model="SpuParams.description"></el-input>
    </el-form-item>
    <el-form-item label="spu imgs">
      <el-form>
        <el-upload
          v-model:file-list="spuImageList"
          action="/api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form>
    </el-form-item>
    <el-form-item label="spu sales attribute">
      <el-select :placeholder="unSelectSaleAttr.length ? `unSelectSaleAttr ${unSelectSaleAttr.length}` : `None`" v-model="saleAttrItemIdName">
        <el-option v-for="item in unSelectSaleAttr" :key="item.id" :label="item.name" :value="`${item.id}:${item.name}`"></el-option>
      </el-select>
      <el-button style="margin: 0 10px" type="primary" icon="plus" :disabled="saleAttrItemIdName ? false : true" @click="addSalesAttribute"
        >add sales attribute</el-button
      >
      <el-table border style="margin: 10px 0px" :data="spuHasSaleAttr">
        <el-table-column label="序号" type="index" width="80px"> </el-table-column>
        <el-table-column label="sales attr name" width="100px" prop="saleAttrName"> </el-table-column>
        <el-table-column label="sales attr value">
          <template v-slot="{ row, $index }">
            <el-tag v-for="item in row.spuSaleAttrValueList" :key="item.name" type="info" @close="handleClose(row, $index)" closable>
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input
              v-if="row.tagEditStatus"
              :ref="(vc: any) => (inputArr[$index] = vc)"
              v-model="row.saleAttrValue"
              class="w-20"
              size="small"
              @keyup.enter="handleInputConfirm(row)"
              style="width: 150px"
            />
            <el-button v-else class="button-new-tag" size="small" @click="showInput(row, $index)"> + New Tag </el-button>
          </template>
        </el-table-column>
        <el-table-column label="operator" width="120px">
          <template v-slot="{ row, $index }">
            <el-button type="primary" size="small" icon="delete"> </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="saveSpu" :disabled="spuHasSaleAttr.length > 0 ? false : true">save</el-button>
      <el-button @click="cancelAddSpu">cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { ElMessage, type ElInput, type UploadProps } from 'element-plus'
import { AllTradeMark, HasSaleAttr, HasSaleAttrResponseData, SaleAttr, SaleAttrValue, SpuData, SpuImg } from '@baseUrl/api/product/spu/type'
import { reqAllTradeMark, reqSpuImageList, reqSpuHasSaleAttr, reqAllSalAttr, reqAddOrUpdateSpu } from '@baseUrl/api/product/spu'
import { TradeMark } from '@baseUrl/api/product/trademark/type'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = () => {}

const handlePictureCardPreview: UploadProps['onPreview'] = uploadFile => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

let allTradeMark = ref<TradeMark[]>([])
let spuImageList = ref<SpuImg[]>([])
let spuHasSaleAttr = ref<SaleAttr[]>([])
let allSalAttr = ref<HasSaleAttr[]>([])
let SpuParams = ref<SpuData>({
  category3Id: '',
  spuName: '',
  description: '',
  tmId: '',
  spuImageList: [],
  spuSaleAttrList: [],
})

let inputArr = ref<any>([])

let saleAttrItemIdName = ref()
const handleClose = (row: any, $index: any) => {
  row.spuSaleAttrValueList.splice($index, 1)
}

const showInput = (row: any, $index: number) => {
  console.log(row)

  row.tagEditStatus = true
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}

const handleInputConfirm = (row: any) => {
  const { baseSaleAttrId, saleAttrValue } = row
  let newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  }

  if (saleAttrValue?.trim() === '' || saleAttrValue === undefined) {
    row.tagEditStatus = false
    return
  }
  let repeat = row.spuSaleAttrValueList.find((item: any) => {
    return item.saleAttrValueName === saleAttrValue
  })
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值重复',
    })
    return
  }
  row.spuSaleAttrValueList.push(newSaleAttrValue)
  row.saleAttrValue = ''
  row.tagEditStatus = false
}

const $emit = defineEmits(['changeScene'])
const cancelAddSpu = () => {
  $emit('changeScene', 0)
}

let unSelectSaleAttr = computed(() => {
  let unSelectArr = allSalAttr.value.filter(item => {
    return spuHasSaleAttr.value.every(item1 => {
      return item.name !== item1.saleAttrName
    })
  })
  return unSelectArr
})

const addSalesAttribute = () => {
  const [baseSaleAttrId, saleAttrName] = saleAttrItemIdName.value.split(':')
  let newSalesAttribute: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  spuHasSaleAttr.value.push(newSalesAttribute)
  saleAttrItemIdName.value = ''
}

const saveSpu = async () => {
  SpuParams.value.spuImageList = spuImageList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    }
  })
  SpuParams.value.spuSaleAttrList = spuHasSaleAttr.value
  let res = await reqAddOrUpdateSpu(SpuParams.value)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: SpuParams.value.id ? '更新成功' : '添加成功',
    })
    $emit('changeScene', 0)
  }
}

const initSpuData = async (spu: SpuData) => {
  SpuParams.value = spu
  let allTradeMarkResult = await reqAllTradeMark()
  allTradeMark.value = allTradeMarkResult.data
  let SpuImageListResult = await reqSpuImageList(spu.id as number)
  spuImageList.value = SpuImageListResult.data
  const SpuHasSaleAttrResult = await reqSpuHasSaleAttr(spu.id as number)
  spuHasSaleAttr.value = SpuHasSaleAttrResult.data
  let AllSalAttrResult = await reqAllSalAttr()
  allSalAttr.value = AllSalAttrResult.data
  spuImageList.value = spuImageList.value.map(item => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
}

const initAddSpu = async (c3Id: number | string) => {
  debugger
  Object.assign(SpuParams.value, {
    category3Id: '',
    spuName: '',
    description: '',
    tmId: '',
    spuImageList: [],
    spuSaleAttrList: [],
  })
  spuImageList.value = []
  spuHasSaleAttr.value = []
  saleAttrItemIdName.value = ''
  SpuParams.value.category3Id = c3Id
  let res: AllTradeMark = await reqAllTradeMark()
  let res1: HasSaleAttrResponseData = await reqAllSalAttr()
  allTradeMark.value = res.data
  allSalAttr.value = res1.data
}

defineExpose({ initSpuData, initAddSpu })
</script>

<style scoped></style>
