<template>
  <el-dialog title="上传文件" v-model="dialogVisible">
    <el-upload
      ref="formRef"
      v-model:file-list="fileList"
      action
      :auto-upload="false"
      :limit="1"
      accept=".xlsx, .xls"
      :disabled="formLoading"
      drag
      :on-exceed="handleExceed"
      :on-error="submitFormError"
      :on-change="handleFileChange">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip" style="color: red">
          提示：1.仅允许导入xlsx, xls格式文件！ 2.重复上传会覆盖
        </div>
      </template>
    </el-upload>
    <template #footer>
      <el-button :disabled="formLoading" @click="submitFile">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { useMessage } from '@/components/message'
import { addTeacherService } from '@/services/AdminService'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import * as XLSX from 'xlsx'

const message = useMessage()

const formRef = ref()
const formLoading = ref(false)
const dialogVisible = ref(false)
const fileList = ref([])
const fileData = ref<any[]>([])

// 读取文件，tolearn
const handleFileChange = async (file: any) => {
  const validTypes = [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ]
  if (!validTypes.includes(file.raw.type)) {
    ElMessage.error('仅支持xlsx/xls格式文件')
    formRef.value.clearFiles()
    return
  }
  try {
    const data = await file.raw.arrayBuffer()
    const workbook = XLSX.read(data)
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
    fileData.value = XLSX.utils.sheet_to_json(firstSheet)
    fileData.value = fileData.value.map(item => ({
      number: item.账号,
      name: item.姓名,
      teacher: {
        A: item.A组,
        C: item.C组,
        total: item.数量
      }
    }))
    console.log(fileData.value)
  } catch (err) {
    submitFormError()
  }
}

const departmentId = ref() // 记录专业ID

// 上传文件
const submitFile = async () => {
  formLoading.value = true
  if (fileList.value.length == 0) {
    message.error('请上传文件!')
    return
  }
  try {
    await addTeacherService(fileData.value, departmentId.value)
    message.success('导入教师成功')
    dialogVisible.value = false
  } catch (error) {
    message.error('导入教师失败')
  } finally {
    formLoading.value = false
  }
}
// 打开上传diolog
const open = async (id: string) => {
  dialogVisible.value = true
  departmentId.value = id
  formRef.value && formRef.value.clearFiles() // 清除上传历史
}
defineExpose({ open }) // 提供open方法

// 上传错误提示
const submitFormError = () => {
  message.error('上传失败，请您重新上传！')
  formLoading.value = false
}

// 文件数超出提示
const handleExceed = () => {
  message.error('最多只能上传一个文件！')
}
</script>
