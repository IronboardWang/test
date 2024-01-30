<template>
  <el-card class="box-card text">
    <el-button type="primary" size="default" icon="plus" @click="openDialogAddTradeMarkVisible">添加品牌</el-button>
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
        @size-change="handlePageSizeChange"
        @current-change="getHasTrademark"
      />
    </div>
  </el-card>

  <el-dialog v-model="dialogAddTradeMarkVisible" title="添加品牌">
    <el-form :model="trademark" style="width: 80%; min-width: 178px">
      <el-form-item label="品牌名称" :label-width="formLabelWidth">
        <el-input v-model="trademarkForm.tmName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="品牌logo" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="trademarkForm.logoUrl" :src="trademarkForm.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogAddTradeMarkVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addTradeMark"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { reqHasTrademark, reqAddTrademark } from '@baseUrl/api/product/trademark/index'
import { Records } from '@baseUrl/api/product/trademark/type'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'

let currentPage = ref(1)
let pageSize = ref(3)
let small = ref(false)
let background = ref(false)
let disabled = ref(false)
let total = ref<number>(0)
let trademark = ref<Records>([])
// const hiddenOnSingle = ref(false)

const handlePageSizeChange = () => {
  currentPage.value = 1
  getHasTrademark()
}

const getHasTrademark = async () => {
  let data = { page: currentPage.value, limit: pageSize.value }
  const res = await reqHasTrademark(data)
  if (res.code === 200) {
    total.value = res.data.total
    trademark.value = res.data.records
    console.log(trademark)
  }
}

const handleEdit = () => {}

const handleDelete = () => {}

const handleAvatarSuccess: UploadProps['onSuccess'] = response => {
  trademarkForm.logoUrl = response.data
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = rawFile => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

onMounted(() => {
  getHasTrademark()
})

// const dialogTableVisible = ref(false)
const dialogAddTradeMarkVisible = ref(false)
const formLabelWidth = '140px'

const openDialogAddTradeMarkVisible = () => {
  trademarkForm.tmName = ''
  trademarkForm.logoUrl = ''
  dialogAddTradeMarkVisible.value = true
}

const addTradeMark = async () => {
  console.log(trademarkForm.logoUrl)

  dialogAddTradeMarkVisible.value = false
  const result = await reqAddTrademark({
    tmName: trademarkForm.tmName,
    logoUrl: trademarkForm.logoUrl,
  })
  console.log(result)
}

const trademarkForm = reactive({
  tmName: '',
  logoUrl: '',
})
</script>

<style scoped>
.demo-pagination-block {
  margin: 20px 0;
  margin-right: 40px;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
