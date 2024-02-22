<template>
  <el-card class="username-card">
    <el-form :inline="true" class="top-username">
      <el-form-item label="username">
        <el-input v-model="username" placeholder="Please input username" clearable />
      </el-form-item>
      <el-form-item>
        <el-button class="search-button" type="primary">search</el-button>
        <el-button type="primary">reset</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <el-button type="primary" @click="addUser">添加</el-button>
    <el-button type="danger">批量删除</el-button>
    <el-table border :data="userListRecords">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="name" prop="name"></el-table-column>
      <el-table-column label="username" prop="username"></el-table-column>
      <el-table-column label="role" prop="roleName"></el-table-column>
      <el-table-column label="ctime" prop="createTime"></el-table-column>
      <el-table-column label="mtime" prop="updateTime"></el-table-column>
      <el-table-column label="operator">
        <template v-slot="{ row }">
          <el-button size="small" icon="User" @click="setRole(row)"> 分配角色 </el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updateUser(row)"> 编辑 </el-button>
          <el-popconfirm :title="`你确定删除${row.username}`" width="260px" @confirm="deleteUser(row.id)">
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
        :total="userTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
  <el-drawer v-model="showAddUser">
    <template #header>
      <h4>add user</h4>
    </template>
    <template #default>
      <el-form ref="userForm" :label-position="labelPosition" label-width="80px" :rules="rules" :model="userParams">
        <el-form-item label="name" prop="name">
          <el-input v-model="userParams.name"></el-input>
        </el-form-item>
        <el-form-item label="username" prop="username">
          <el-input v-model="userParams.username"></el-input>
        </el-form-item>
        <el-form-item v-show="isAddUser" label="password" prop="password">
          <el-input v-model="userParams.password"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelUserClick">cancel</el-button>
        <el-button type="primary" @click="confirmAddOrUpdateUserClick(userForm)">confirm</el-button>
      </div>
    </template>
  </el-drawer>

  <el-drawer v-model="setRoleVisibility">
    <template #header>
      <h4>set role</h4>
    </template>
    <template #default>
      <el-form :label-position="labelPosition" label-width="80px">
        <el-form-item label="username">
          <el-input :value="userParams.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="role">
          <div style="display: block">
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">Check all</el-checkbox>
            <el-checkbox-group v-model="checkedRoles" @change="handleCheckedRoleChange">
              <el-checkbox v-for="role in roles" :key="role" :label="role">{{ role }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelSetRoleClick">cancel</el-button>
        <el-button type="primary" @click="confirmSetRoleClick">confirm</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { reqAddOrUpdateUser, reqUserInfo } from '@baseUrl/api/acl/user'
import { User } from '@baseUrl/api/acl/user/type'
import { CheckboxValueType, ElMessage, FormInstance, FormProps, FormRules } from 'element-plus'
import { ref, reactive, onMounted, nextTick } from 'vue'

const labelPosition = ref<FormProps['labelPosition']>('left')
let username = ref('')

let currentPage = ref(1)
let pageSize = ref(5)
let userTotal = ref(0)

let userListRecords = ref()

let showAddUser = ref(false)
let userForm = ref()
let isAddUser = ref(false)
let userParams = reactive<User>({
  username: '',
  name: '',
  password: '',
})

let setRoleVisibility = ref(true)
const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedRoles = ref(['Shanghai', 'Beijing'])
const roles = ref(['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'])

const handleSizeChange = () => {
  getUserList()
}
const handleCurrentChange = () => {
  getUserList()
}

const getUserList = async () => {
  const result = await reqUserInfo(currentPage.value, pageSize.value, username.value)
  if (result.code === 200) {
    userListRecords.value = result.data.records
    userTotal.value = result.data.total
    console.log(userListRecords.value)
  }
}

const addUser = () => {
  showAddUser.value = true
  isAddUser.value = true
  Object.assign(userParams, {
    id: 0,
    username: '',
    name: '',
    password: '',
  })
  nextTick(() => {
    userForm.value.clearValidate('username')
    userForm.value.clearValidate('name')
    userForm.value.clearValidate('password')
  })
}

const updateUser = (row: any) => {
  showAddUser.value = true
  isAddUser.value = false

  Object.assign(userParams, {
    id: row.id,
    username: row.username,
    name: row.name,
  })

  nextTick(() => {
    userForm.value.clearValidate('username')
    userForm.value.clearValidate('name')
    userForm.value.clearValidate('password')
  })
}

const cancelUserClick = () => {
  showAddUser.value = false
  isAddUser.value = false
}

const validatorUserName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('用户名字至少五位'))
  }
}

const validatorName = (rule: any, value: any, callBack: any) => {
  console.log(value)
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('用户昵称至少五位'))
  }
}

const validatorPassword = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('用户密码至少六位'))
  }
}

const rules = reactive<FormRules<typeof userParams>>({
  username: [{ required: true, trigger: 'blur', validator: validatorUserName }],
  name: [{ required: true, trigger: 'blur', validator: validatorName }],
  password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
})

const confirmAddOrUpdateUserClick = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async valid => {
    if (valid) {
      const result = await reqAddOrUpdateUser(userParams)
      if (result.code === 200) {
        showAddUser.value = false
        ElMessage({
          type: 'success',
          message: userParams.id ? '更新成功' : '添加成功',
        })
        getUserList()
      } else {
        showAddUser.value = false
        isAddUser.value = false
        ElMessage({
          type: 'error',
          message: userParams.id ? '更新失败' : '添加失败',
        })
      }
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const setRole = async (row: any) => {
  setRoleVisibility.value = true
  const checkedCount = checkedRoles.value.length
  checkAll.value = checkedCount === roles.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < roles.value.length
  Object.assign(userParams, {
    username: row.username,
  })
}

const handleCheckAllChange = (val: CheckboxValueType) => {
  checkedRoles.value = val ? roles.value : []
  isIndeterminate.value = false
}
const handleCheckedRoleChange = (value: CheckboxValueType[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === roles.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < roles.value.length
}

onMounted(() => {
  getUserList()
})
</script>

<style scoped>
.username-card {
  height: 80px;
  margin-bottom: 10px;
}
.el-input {
  --el-input-width: 220px;
}
.top-username {
  display: flex;
  justify-content: left;
  align-items: center;
}
.search-button {
  margin: 10px;
}
</style>
