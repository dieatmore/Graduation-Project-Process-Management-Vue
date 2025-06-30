<template>
  <div class="w-full h-full bg-[#F9FAFB] py-8 px-16">
    <!-- 功能栏 -->
    <div
      class="h-[10%] bg-white p-4 rounded-xl flex justify-evenly border-gray shadow-sm"
      style="border-width: 1px">
      <el-form :inline="true" :model="formInline" class="demo-form-inline mt-2">
        <el-form-item label="专业名称">
          <el-input
            v-model="formInline.departmentName"
            placeholder="请输入专业名称"
            clearable
            style="width: 240px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">
            <Search style="width: 1em; height: 1em; margin-right: 4px" />
            搜索
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDepartment">
            <RefreshRight style="width: 1em; height: 1em; margin-right: 4px" />
            重置
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" class="flex ml-4">
            <Plus style="width: 1em; height: 1em; margin-right: 4px" />
            新增专业
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 专业列表 -->
    <div
      class="w-full h-[85%] mt-8 bg-white border-gray shadow-sm rounded-xl"
      style="border-width: 1px">
      <el-table :data="departmentList" stripe style="width: 100%" height="680">
        <el-table-column prop="id" label="专业ID" width="350" />
        <el-table-column prop="name" label="专业名称" />
        <el-table-column prop="updateTime" label="创建时间" width="350" :formatter="formatDate" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">导入教师</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getDepartmentList, getSearchDepartment } from '@/api/admin'
import { formatDate } from '@/services'
import type { Department } from '@/types'
import { Plus, RefreshRight, Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'

const departmentList = ref<Department[]>([])

const formInline = ref({
  departmentName: ''
})

const onSubmit = async () => {
  if (!formInline.value.departmentName) {
    ElMessage.warning('请输入部门名称') // 空值校验
    return
  }
  try {
    const { execute } = getSearchDepartment(formInline.value.departmentName)
    const resultList = await execute()
    if (resultList.data.value?.data.length == 0) {
      ElMessage.warning('未找到匹配的专业')
    } else {
      resultList.data.value && (departmentList.value = resultList.data.value?.data)
    }
  } catch (e: any) {
    ElMessage.error('搜索失败: ' + e.message)
  }
}

const handleEdit = (row: any) => {
  console.log('编辑行数据:', row)
}

const handleDelete = (row: any) => {
  console.log('删除行数据:', row)
}

// 获取专业列表数据
const getDepartment = async () => {
  try {
    const { data } = await getDepartmentList()
    if (data.value?.data) {
      departmentList.value = data.value.data
    }
  } catch (e: any) {
    ElMessage.error('获取数据失败:', e)
  }
}

onMounted(async () => {
  getDepartment()
})
</script>
<style scoped>
::v-deep .el-table .cell {
  text-align: center;
}
</style>
