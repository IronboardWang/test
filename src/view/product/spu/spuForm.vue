<template>
  <el-form style="width: 60%; min-width: 178px; margin: 10px 20px" label-position="left" label-width="150px">
    <el-form-item label="spuName">
      <el-input placeholder="please input spuName"></el-input>
    </el-form-item>
    <el-form-item label="spu brand">
      <el-select>
        <el-option label="huawei" value="huawei"></el-option>
        <el-option label="huawei" value="huawei"></el-option>
        <el-option label="huawei" value="huawei"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="spu description">
      <el-input type="textarea" placeholder="please input spu description"></el-input>
    </el-form-item>
    <el-form-item label="spu imgs">
      <el-form>
        <el-upload
          v-model:file-list="fileList"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
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
      <el-table border style="margin: 10px 0px">
        <el-table-column label="index" width="80px"> </el-table-column>
        <el-table-column label="sales attr name" width="100px"> </el-table-column>
        <el-table-column label="sales attr value"> </el-table-column>
        <el-table-column label="operator" width="120px"> </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">save</el-button>
      <el-button @click="cancelAddSpu">cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { UploadProps, UploadUserFile } from 'element-plus'

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = uploadFile => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const $emit = defineEmits(['changeScene'])

const cancelAddSpu = () => {
  $emit('changeScene', 0)
}
</script>

<style scoped></style>
