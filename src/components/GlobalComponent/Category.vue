<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>分类</span>
      </div>
    </template>
    <el-form ref="classRef" :inline="true" :model="classFormInline" class="class-form-inline" :rules="rules">
      <el-form-item label="一级分类" prop="firstClass">
        <el-select v-model="classFormInline.firstClass" placeholder="一级分类" clearable :disabled="true ? detailShowScene === 1 : false">
          <el-option v-for="c1 in c1Arr" :key="c1.id" :label="c1.name" :value="c1.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" prop="secondClass">
        <el-select v-model="classFormInline.secondClass" placeholder="二级分类" clearable :disabled="true ? detailShowScene === 1 : false">
          <el-option v-for="c2 in c2Arr" :key="c2.id" :label="c2.name" :value="c2.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类" prop="thirdClass">
        <el-select v-model="classFormInline.thirdClass" placeholder="三级分类" clearable :disabled="true ? detailShowScene === 1 : false">
          <el-option v-for="c3 in c3Arr" :key="c3.id" :label="c3.name" :value="c3.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(classRef)">查询</el-button>
      </el-form-item>
    </el-form>
    <template #footer>Footer content</template>
  </el-card>
</template>

<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus'
import { onMounted, reactive, ref, watch } from 'vue'

const props = defineProps(['c1Arr', 'c2Arr', 'c3Arr', 'detailShowScene'])
console.log(props.detailShowScene)

const $emit = defineEmits(['getC1', 'getC2', 'getC3', 'onSubmit'])
const classFormInline = ref({
  firstClass: '',
  secondClass: '',
  thirdClass: '',
})
const classRef = ref()

onMounted(() => {
  $emit('getC1')
})

watch(
  () => classFormInline.value.firstClass,
  () => {
    $emit('getC2', classFormInline.value.firstClass)
    classFormInline.value.secondClass = ''
    classRef.value.clearValidate(['firstClass', 'secondClass', 'thirdClass'])
  },
)

watch(
  () => classFormInline.value.secondClass,
  () => {
    $emit('getC3', classFormInline.value.secondClass)
    classFormInline.value.thirdClass = ''
    classRef.value.clearValidate(['firstClass', 'secondClass', 'thirdClass'])
  },
)

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(valid => {
    if (valid) {
      onSubmit()
    }
  })
}

const onSubmit = () => {
  $emit('onSubmit', classFormInline)
}

const rules = reactive<FormRules<typeof classFormInline>>({
  firstClass: [{ required: true }],
  secondClass: [{ required: true }],
  thirdClass: [{ required: true }],
})
</script>

<style scoped></style>
