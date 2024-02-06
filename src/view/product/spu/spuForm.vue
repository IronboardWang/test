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
      <el-select>
        <el-option label="huawei" value="huawei"></el-option>
        <el-option label="huawei" value="huawei"></el-option>
        <el-option label="huawei" value="huawei"></el-option>
      </el-select>
      <el-button style="margin: 0 10px" type="primary" icon="plus">add sales attribute</el-button>
      <el-table border style="margin: 10px 0px" :data="spuHasSaleAttr">
        <el-table-column label="index" width="80px"> </el-table-column>
        <el-table-column label="sales attr name" width="100px" prop="saleAttrName"> </el-table-column>
        <el-table-column label="sales attr value">
          <template v-slot="{ row }">
            <el-tag v-for="item in row.spuSaleAttrValueList" :key="item.name" type="info" @close="handleClose(row, item)" closable>
              {{ item.saleAttrName }}
            </el-tag>
            <el-input
              v-if="inputVisible"
              ref="InputRef"
              v-model="inputValue"
              class="w-20"
              size="small"
              @keyup.enter="handleInputConfirm(row)"
              @blur="handleInputConfirm(row)"
            />
            <el-button v-else class="button-new-tag" size="small" @click="showInput"> + New Tag </el-button>
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
      <el-button type="primary">save</el-button>
      <el-button @click="cancelAddSpu">cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import type { ElInput, UploadProps } from 'element-plus'
import { HasSaleAttr, SaleAttr, SpuData, SpuImg } from '@baseUrl/api/product/spu/type'
import { reqAllTradeMark, reqSpuImageList, reqSpuHasSaleAttr, reqAllSalAttr } from '@baseUrl/api/product/spu'
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

const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

const handleClose = (row: any, item: string) => {
  row.spuSaleAttrValueList.splice(row.spuSaleAttrValueList.indexOf(item), 1)
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
  console.log(spuImageList.value)
  spuImageList.value = spuImageList.value.map(item => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = (row: any) => {
  if (inputValue.value) {
    row.spuSaleAttrValueList.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}

const $emit = defineEmits(['changeScene'])
defineExpose({ initSpuData })
const cancelAddSpu = () => {
  $emit('changeScene', 0)
}
</script>

<style scoped></style>
