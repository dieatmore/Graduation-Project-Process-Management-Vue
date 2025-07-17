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
          <el-button type="primary" @click="resetSearch">
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
import { useGet } from '@/axios'
import { useMessage } from '@/components/message'
import { formatDate } from '@/services'
import {
  addDepartmentService,
  deleteDepartmentService,
  departmentListService,
  searchDepartmentService
} from '@/services/AdminService'
import { useDepartmentStore } from '@/stores/DepartmentStore'
import type { Department } from '@/types'
import { DeleteFilled, Download, Plus, RefreshRight, Search } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import TeacherFile from './TeacherFile.vue'

const departmentStore = useDepartmentStore()

// 直接绑定到 store 中的数据
let departmentList = departmentStore.departmentsS
console.log(departmentStore.departmentsS)
const message = useMessage()
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
    const res = await addDepartmentService(addForm.value)
    dialogFormVisible.value = false
    message.success('添加成功')
  } catch (error) {
    message.error('添加失败')
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
    message.warning('请输入部门名称') // 空值校验
    return
  }
  try {
    const res = await searchDepartmentService(formInline.value.departmentName)
    if (res.length == 0) {
      message.warning('未找到匹配的专业')
    } else {
      departmentList.value = res
    }
  } catch (e: any) {
    message.error('搜索失败: ' + e.message)
  }
}

// 重置所有专业
const resetSearch = async () => {
  // 清空搜索输入框
  formInline.value.departmentName = ''
  // 重新获取专业列表
  const data = await useGet('admin/departments')
  departmentStore.departmentsS.value = data as unknown as Department[]
}

// 删除专业
const handleDelete = async (id: string) => {
  deleting.value = true
  try {
    const res = await deleteDepartmentService(id)
    message.success('删除成功')
  } catch (error: any) {
    message.error('删除失败')
  } finally {
    deleting.value = false
  }
}

// 初始化
onMounted(async () => {
  await departmentListService()
})
</script>

<style scoped>
::v-deep .el-table .cell {
  text-align: center;
}
</style>
