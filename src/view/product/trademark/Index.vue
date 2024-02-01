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
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">Edit</el-button>
          <el-popconfirm :title="`Are you sure to delete ${scope.row.tmName}?`" @confirm="handleDelete(scope.row)" icon="Delete">
            <template #reference>
              <el-button size="small" type="danger">Delete</el-button>
            </template>
          </el-popconfirm>
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

  <el-dialog v-model="dialogTradeMarkVisible" :title="dialog_title">
    <el-form ref="trademarkRef" :model="trademarkForm" style="width: 80%; min-width: 178px" :rules="rules">
      <el-form-item label="品牌名称" :label-width="formLabelWidth" style="width: 50%" prop="tmName">
        <el-input v-model="trademarkForm.tmName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="品牌logo" :label-width="formLabelWidth" prop="logoUrl">
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
        <el-button @click="dialogTradeMarkVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitForm(trademarkRef)"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'
import { reqHasTrademark, reqAddTrademark, reqUpdateTrademark, reqDeleteTrademark } from '@baseUrl/api/product/trademark/index'
import { Records } from '@baseUrl/api/product/trademark/type'
import type { FormInstance, FormRules, UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'

let currentPage = ref(1)
let pageSize = ref(3)
let small = ref(false)
let background = ref(false)
let disabled = ref(false)
let total = ref<number>(0)
let trademark = ref<Records>([])
let dialog_title = ref('')
let currentTradeMark = ref('')
const trademarkRef = ref<FormInstance>()

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

const handleEdit = (row: any) => {
  trademarkForm.tmName = row.tmName
  trademarkForm.logoUrl = row.logoUrl
  currentTradeMark.value = row.id
  dialog_title.value = 'Edit Trademark'
  dialogTradeMarkVisible.value = true
  nextTick(() => {
    clearTrademarkValidate()
  })
}

const handleDelete = async (row: any) => {
  const result = await reqDeleteTrademark({
    id: row.id,
  })
  if (result.code === 200) {
    getHasTrademark()
  }
}

const handleAvatarSuccess: UploadProps['onSuccess'] = response => {
  trademarkForm.logoUrl = response.data
  trademarkRef.value?.clearValidate('logoUrl')
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
const dialogTradeMarkVisible = ref(false)
const formLabelWidth = '140px'

const openDialogAddTradeMarkVisible = () => {
  trademarkForm.tmName = ''
  trademarkForm.logoUrl = ''
  currentTradeMark.value = ''
  dialog_title.value = 'Add Trade Mark'
  dialogTradeMarkVisible.value = true

  nextTick(() => {
    clearTrademarkValidate()
  })
}

const clearTrademarkValidate = () => {
  trademarkRef.value?.clearValidate('tmName')
  trademarkRef.value?.clearValidate('logoUrl')
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(valid => {
    if (valid) {
      updateTradeMark()
    } else {
      return false
    }
  })
}

const updateTradeMark = async () => {
  dialogTradeMarkVisible.value = false
  if (currentTradeMark.value === '') {
    const result = await reqAddTrademark({
      tmName: trademarkForm.tmName,
      logoUrl: trademarkForm.logoUrl,
    })
    if (result.code === 200) {
      getHasTrademark()
    }
  } else {
    const result = await reqUpdateTrademark({
      tmName: trademarkForm.tmName,
      logoUrl: trademarkForm.logoUrl,
      id: currentTradeMark.value,
    })
    if (result.code === 200) {
      getHasTrademark()
    }
  }
}

const trademarkForm = reactive({
  tmName: '',
  logoUrl: '',
})
const validateTmName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the TmName'))
  } else {
    if (value.length < 2 || value.length >= 18) {
      callback(new Error('TmName must between 2 ~ 18 characters'))
    }
    callback()
  }
}
const validateLogoUrl = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please upload the Logo'))
  } else {
    callback()
  }
}
const rules = reactive<FormRules<typeof trademarkForm>>({
  tmName: [{ required: true, validator: validateTmName, trigger: 'blur' }],
  logoUrl: [{ required: true, validator: validateLogoUrl }],
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
