<template>
  <el-card class="role-name-card">
    <el-form :inline="true" class="top-role-name">
      <el-form-item label="role name">
        <el-input v-model="keyword" placeholder="Please input role name" clearable />
      </el-form-item>
      <el-form-item>
        <el-button class="search-button" type="primary" @click="getRoleList">search</el-button>
        <el-button type="primary" @click="reset">reset</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0">
    <el-button type="primary" @click="addRole">add role</el-button>
    <el-table :data="allRole">
      <el-table-column type="index" align="center" label="#"></el-table-column>
      <el-table-column label="ID" align="center" prop="id"></el-table-column>
      <el-table-column label="职位名称" align="center" show-overflow-tooltip prop="roleName"></el-table-column>
      <el-table-column label="创建时间" align="center" show-overflow-tooltip prop="createTime"></el-table-column>
      <el-table-column label="更新时间" align="center" show-overflow-tooltip prop="updateTime"></el-table-column>
      <el-table-column label="操作" width="280px" align="center">
        <template #="{ row, $index }">
          <el-button size="small" icon="User" @click="setPermission(row)"> 分配权限 </el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updateRole(row)"> 编辑 </el-button>
          <el-popconfirm :title="`你确定要删除${row.roleName}?`" width="260px" @confirm="removeRole(row.id)">
            <template #reference>
              <el-button type="danger" size="small" icon="Delete"> 删除 </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 15, 20]"
        layout="prev, pager, next, jumper,sizes,->,total "
        :total="roleTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
  <el-dialog v-model="isAddOrEditRole" :title="roleParams.id ? 'edit role' : 'add role'" width="500">
    <el-form :model="roleParams" :rules="rules" ref="roleParamsForm">
      <el-form-item label="role name" prop="roleName">
        <el-input placeholder="please input role name" v-model="roleParams.roleName"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isAddOrEditRole = false">Cancel</el-button>
        <el-button type="primary" @click="confirmAddRole(roleParamsForm)"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
  <el-drawer v-model="SetPermissionShow">
    <template #header>
      <h4>set setPermission</h4>
    </template>
    <template #default>
      <el-tree
        ref="setPermissionTree"
        :data="menuData"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="checked_permissions"
        :props="defaultProps"
      />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelSetPermissionClick">cancel</el-button>
        <el-button type="primary" @click="confirmSetPermissionClick">confirm</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { reqAddOrUpdateRole, reqAllMenuList, reqAllRoleList, reqRemoveRole, reqSetPermission } from '@baseUrl/api/acl/role'
import { RoleResponseData } from '@baseUrl/api/acl/role/type'
import { RoleData } from '@baseUrl/api/acl/user/type'
import { ElMessage, FormInstance } from 'element-plus'
import { ref, reactive, onMounted, nextTick } from 'vue'

onMounted(() => {
  getRoleList()
})

let keyword = ref('')

let allRole = ref()

let currentPage = ref(1)
let pageSize = ref(5)
let roleTotal = ref(0)

let roleParamsForm = ref()
let isAddOrEditRole = ref(false)

let roleParams = ref<RoleData>({
  id: 0,
  createTime: '',
  updateTime: '',
  roleName: '',
  remark: null,
})

let SetPermissionShow = ref(false)

const getRoleList = async () => {
  const result: RoleResponseData = await reqAllRoleList(currentPage.value, pageSize.value, keyword.value)
  allRole.value = result.data.records
  roleTotal.value = result.data.total
  console.log(result)
}
const reset = () => {
  keyword.value = ''
  getRoleList()
}

const handleSizeChange = () => {
  getRoleList()
}
const handleCurrentChange = () => {
  getRoleList()
}

const validateRoleName = (rule: any, value: any, callback: any) => {
  if (value.trim().length <= 2) {
    callback(new Error('Please input the role name again'))
  } else {
    callback()
  }
}
const rules = {
  roleName: [{ validator: validateRoleName, trigger: 'blur' }],
}

const addRole = () => {
  isAddOrEditRole.value = true
  Object.assign(roleParams.value, {
    id: 0,
    createTime: '',
    updateTime: '',
    roleName: '',
    remark: null,
  })
  nextTick(() => {
    roleParamsForm.value.clearValidate('roleName')
  })
}
const confirmAddRole = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async valid => {
    if (valid) {
      const result = await reqAddOrUpdateRole(roleParams.value)
      if (result.code === 200) {
        isAddOrEditRole.value = false
        ElMessage({
          type: 'success',
          message: roleParams.value.id ? '更新成功' : '添加成功',
        })
        getRoleList()
      } else {
        isAddOrEditRole.value = false
        ElMessage({
          type: 'error',
          message: roleParams.value.id ? '更新失败' : '添加失败',
        })
      }
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const updateRole = (row: any) => {
  Object.assign(roleParams.value, row)
  console.log(roleParams.value)

  isAddOrEditRole.value = true
  nextTick(() => {
    roleParamsForm.value.clearValidate('roleName')
  })
}

const defaultProps = {
  children: 'children',
  label: 'name',
}

const get_checked_permissions = (records: any, initArr: any) => {
  records.forEach((item: any) => {
    if (item.select && item.level === 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      get_checked_permissions(item.children, initArr)
    }
  })

  return initArr
}

let menuData = ref()
let checked_permissions = ref([])
let setPermissionTree = ref()
const setPermission = async (row: any) => {
  SetPermissionShow.value = true
  Object.assign(roleParams.value, row)
  const result = await reqAllMenuList(roleParams.value.id as number)
  menuData.value = result.data
  checked_permissions.value = get_checked_permissions(menuData.value, [])
}

const cancelSetPermissionClick = () => {
  SetPermissionShow.value = false
}
const confirmSetPermissionClick = async () => {
  let getCheckedKeys = setPermissionTree.value.getCheckedKeys()
  let getHalfCheckedKeys = setPermissionTree.value.getHalfCheckedKeys()
  let setPermissionList = getCheckedKeys.concat(getHalfCheckedKeys)
  let result = await reqSetPermission(roleParams.value.id as number, setPermissionList)
  if (result.code === 200) {
    SetPermissionShow.value = false
    ElMessage({
      type: 'success',
      message: '更新成功',
    })
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: '更新失败',
    })
  }
}

const removeRole = async (id: number) => {
  const result = await reqRemoveRole(id)
  if (result.code === 200) {
    SetPermissionShow.value = false
    ElMessage({
      type: 'success',
      message: '更新成功',
    })
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: '更新失败',
    })
  }
}
</script>

<style scoped>
.role-name-card {
  height: 80px;
  margin-bottom: 10px;
}
.top-role-name {
  display: flex;
  justify-content: left;
  align-items: center;
}
.search-button {
  margin: 10px;
}
</style>
