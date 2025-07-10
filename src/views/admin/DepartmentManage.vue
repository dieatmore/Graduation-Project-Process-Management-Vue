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
          <el-button type="success" class="flex ml-4" @click="openDialog">
            <Plus style="width: 1em; height: 1em; margin-right: 4px" />
            新增专业
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 新增专业dialog -->
      <el-dialog v-model="dialogFormVisible" title="新增专业" width="400">
        <el-form :model="addForm">
          <el-form-item label="专业名称">
            <el-input v-model="addForm.name" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="handleConfirm" :loading="submitting">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <!-- 专业列表 -->
    <div
      class="w-full h-[85%] mt-8 bg-white border-gray shadow-sm rounded-xl"
      style="border-width: 1px">
      <el-table
        :data="departmentList"
        stripe
        style="width: 100%"
        height="680"
        empty-text="暂无专业数据，请添加或刷新">
        <el-table-column prop="id" label="专业ID" width="350" />
        <el-table-column prop="name" label="专业名称" />
        <el-table-column prop="updateTime" label="创建时间" width="350" :formatter="formatDate" />
        <el-table-column label="操作" width="350">
          <template #default="scope">
            <el-button @click="openForm(scope.row.id)">
              <Download style="width: 1em; height: 1em; margin-right: 4px" plain />
              导入教师
            </el-button>
            <el-button type="danger" @click="handleDelete(scope.row.id)" :loading="deleting">
              <DeleteFilled style="width: 1em; height: 1em; margin-right: 4px" />
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <TeacherFile ref="formRef" />
</template>
<script setup lang="ts">
import {
  addDepartment,
  deleteDepartment,
  getDepartmentList,
  getSearchDepartment
} from '@/api/admin'
import { formatDate } from '@/services'
import type { Department } from '@/types'
import { DeleteFilled, Download, Plus, RefreshRight, Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
import TeacherFile from './TeacherFile.vue'

const departmentList = ref<Department[]>([])

const dialogFormVisible = ref(false)

/** 添加/修改操作 */
const formRef = ref()
const openForm = (id: string) => {
  formRef.value.open(id)
}

const formInline = ref({
  departmentName: ''
})

const addForm = ref({
  name: ''
})

const submitting = ref(false)
const deleting = ref(false)

// 添加专业
const handleConfirm = async () => {
  submitting.value = true
  try {
    const { execute } = addDepartment(addForm.value)
    const res = await execute()
    dialogFormVisible.value = false
    ElMessage.success('添加成功')
    // 刷新列表数据
    getDepartment()
  } catch (error) {
    console.error(error)
    ElMessage.error('添加失败')
  } finally {
    submitting.value = false
  }
}

// 新增专业
const openDialog = () => {
  dialogFormVisible.value = true
  addForm.value.name = ''
}

// 搜索专业
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

// 删除专业
const handleDelete = async (id: string) => {
  deleting.value = true
  try {
    const { execute } = deleteDepartment(id)
    const res = await execute()
    if (res.data.value?.code == 200) {
      ElMessage.success('删除成功')
    } else ElMessage.error(res.data.value?.message)
    // 刷新列表数据
    getDepartment()
  } catch (error: any) {
    console.error(error)
    ElMessage.error(error)
  } finally {
    deleting.value = false
  }
}

// 获取专业列表数据
const getDepartment = async () => {
  try {
    const { data } = await getDepartmentList()
    if (data.value?.data) {
      departmentList.value = data.value.data
    }
    console.log(data)
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
