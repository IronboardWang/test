<template>
  <el-table style="width: 100%; margin-bottom: 20px" border :data="permissions" row-key="id" :expand-row-keys="['1']">
    <el-table-column label="name" prop="name"></el-table-column>
    <el-table-column label="permission" prop="code"></el-table-column>
    <el-table-column label="mtime" prop="updateTime"></el-table-column>
    <el-table-column label="operator">
      <template v-slot="{ row, $index }">
        <el-button type="primary" @click="addBtn(row)">{{ row.level === 3 ? 'add func' : 'add menu' }}</el-button>
        <el-button type="primary" @click="updateBtn(row)" :disabled="row.level === 1 ? true : false">edit</el-button>
        <el-popconfirm :title="`你确定要删除${row.name}?`" width="260px" @confirm="deleteBtn(row.id)">
          <template #reference>
            <el-button type="danger" size="small" icon="Delete" :disabled="row.level === 1 ? true : false"> 删除 </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="addOrEditShow" title="Tips" width="500" :before-close="handleClose">
    <el-form>
      <el-form-item label="name">
        <el-input v-model="menuData.name"></el-input>
      </el-form-item>
      <el-form-item label="permission">
        <el-input v-model="menuData.code"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button>Cancel</el-button>
        <el-button type="primary" @click="saveMenuData"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reqAddOrUpdateMenu, reqAllPermission, reqRemoveMenu } from '@baseUrl/api/acl/menu'
import { PermissionResponseData } from '@baseUrl/api/acl/menu/type'
import { ElMessage } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
onMounted(() => {
  getPermissionList()
})

let permissions = ref()
let menuData = reactive({
  pid: 0,
  code: '',
  name: '',
  level: 0,
  id: 0,
})

let addOrEditShow = ref<boolean>(false)

const getPermissionList = async () => {
  const result: PermissionResponseData = await reqAllPermission()
  if (result.code === 200) {
    permissions.value = result.data
  }
}

const addBtn = (row: any) => {
  addOrEditShow.value = true
  menuData.pid = row.id
  menuData.level = row.level + 1
  menuData.id = 0
}

const updateBtn = (row: any) => {
  addOrEditShow.value = true
  Object.assign(menuData, row)
}

const saveMenuData = async () => {
  const result = await reqAddOrUpdateMenu(menuData)
  console.log(result)
  if (result.code === 200) {
    addOrEditShow.value = false
    ElMessage({
      type: 'success',
      message: menuData.id ? '更新成功' : '添加成功',
    })
    getPermissionList()
  } else {
    ElMessage({
      type: 'error',
      message: menuData.id ? '更新失败' : '添加失败',
    })
  }
}

const deleteBtn = async (id: number) => {
  const result = await reqRemoveMenu(id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getPermissionList()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
</script>

<style scoped></style>
