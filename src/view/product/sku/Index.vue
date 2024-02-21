<template>
  <el-card>
    <el-table border :data="skuRecords">
      <el-table-column label="order" type="index" align="center" width="80px"></el-table-column>
      <el-table-column prop="skuName" label="name" show-overflow-tooltip min-width="100px"></el-table-column>
      <el-table-column prop="skuDesc" label="desc" show-overflow-tooltip min-width="250px"></el-table-column>
      <el-table-column label="image" width="150px">
        <template v-slot="{ row }">
          <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="weight" width="150px"></el-table-column>
      <el-table-column prop="price" label="price" width="150px"></el-table-column>
      <el-table-column label="operator" min-width="250px">
        <template #="{ row, $index }">
          <el-button size="small" :icon="row.isSale === 1 ? 'Bottom' : 'Top'" @click="updateSale(row)"></el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updateSku"></el-button>
          <el-button type="info" size="small" icon="InfoFilled" @click="findSku(row)"></el-button>
          <el-popconfirm :title="`你确定要删除${row.skuName}`" width="200px" @confirm="removeSku(row.id)">
            <template #reference>
              <el-button type="danger" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="spu-pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 15, 20]"
        layout="prev, pager, next, jumper,sizes,->,total "
        :total="skuTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
  <el-drawer v-model="drawer">
    <template #header>
      <h4>check sku detail</h4>
    </template>
    <template #default>
      <el-row>
        <el-col :span="4"><span>name</span></el-col>
        <el-col :span="12">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><span>desc</span></el-col>
        <el-col :span="12">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><span>price</span></el-col>
        <el-col :span="12">{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><span>平台属性</span></el-col>
        <el-col :span="12">
          <el-tag v-for="item in skuInfo.skuAttrValueList" :key="item.id">
            {{ item.attrName }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><span>销售属性</span></el-col>
        <el-col :span="12">
          <el-tag v-for="item in skuInfo.skuSaleAttrValueList" :key="item.id">
            {{ item.saleAttrValueName }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row style="margin: 10px 0">
        <el-col :span="6">商品图片</el-col>
        <el-col :span="18">
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl" alt="" style="width: 100%; height: 100%" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { reqCancelSale, reqRemoveSku, reqSaleSku, reqSkuInfo, reqSkuList } from '@baseUrl/api/product/sku'
import { SkuInfoData } from '@baseUrl/api/product/sku/type'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'

let currentPage = ref(1)
let pageSize = ref(10)
let skuTotal = ref(0)
let skuRecords = ref()

let drawer = ref(false)
let skuInfo = ref()

const handleSizeChange = () => {
  getSkuList()
}
const handleCurrentChange = () => {
  getSkuList()
}

const getSkuList = async () => {
  const result = await reqSkuList(currentPage.value, pageSize.value)
  skuRecords.value = result.data.records
  skuTotal.value = result.data.total
  console.log(skuRecords.value)
}

const updateSale = async (row: any) => {
  if (row.isSale === 1) {
    await reqCancelSale(row.id as number)
    ElMessage({
      type: 'success',
      message: '下架成功',
    })
  } else {
    await reqSaleSku(row.id as number)
    ElMessage({
      type: 'success',
      message: '上架成功',
    })
  }
  getSkuList()
}
const updateSku = () => {}
const findSku = async (row: any) => {
  let res: SkuInfoData = await reqSkuInfo(row.id as number)
  skuInfo.value = res.data
  drawer.value = true
}
const removeSku = async (id: number) => {
  let result = await reqRemoveSku(id as number)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
  getSkuList()
}
onMounted(() => {
  getSkuList()
})
</script>

<style scoped>
.spu-pagination {
  margin-top: 10px;
}
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
