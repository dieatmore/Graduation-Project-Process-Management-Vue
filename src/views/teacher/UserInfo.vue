<template>
  <div class="w-full h-full bg-[#F9FAFB] py-8 px-40">
    <!-- 个人信息 -->
    <div
      class="bg-white p-4 rounded-xl border-gray shadow-sm mt-28 py-20 px-12"
      style="border-width: 1px">
      <el-descriptions class="" title="个人信息" :column="2" size="large" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <user />
              </el-icon>
              姓名
            </div>
          </template>
          {{ user?.name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <iphone />
              </el-icon>
              学号/工号
            </div>
          </template>
          {{ user?.number }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <location />
              </el-icon>
              所属专业
            </div>
          </template>
          <el-tag size="large">{{ departmentName || '暂无数据' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <tickets />
              </el-icon>
              所在小组
            </div>
          </template>
          <el-tag size="large">
            {{ user?.groupNumber != null ? `第${user?.groupNumber}` : '暂无' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <office-building />
              </el-icon>
              详细信息
            </div>
          </template>
          {{ user?.description || '暂无信息' }}
        </el-descriptions-item>
      </el-descriptions>

      <!-- 操作 -->
      <div class="relative px-4 pt-24">
        <div class="absolute right-8">
          <el-button type="primary" @click="openDialog1">修改密码</el-button>
          <el-button type="success" class="button-info" @click="openDialog2">
            更新详细信息
          </el-button>
        </div>
      </div>

      <!-- 修改密码dialog -->
      <el-dialog v-model="dialogFormVisible1" title="修改密码" width="400">
        <el-form :model="newUser.password">
          <el-form-item label="新密码">
            <el-input v-model="newUser.password" autocomplete="off" type="password" show-password />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible1 = false">取消</el-button>
            <el-button type="primary" @click="handleConfirm1" :loading="submitting">确认</el-button>
          </span>
        </template>
      </el-dialog>

      <!-- 更新信息dialog -->
      <el-dialog v-model="dialogFormVisible2" title="更新详细信息" width="400">
        <el-form :model="newUser.description">
          <el-form-item label="详细信息">
            <el-input v-model="newUser.description" autocomplete="off" type="textarea" :rows="4" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取消</el-button>
            <el-button type="primary" @click="handleConfirm2" :loading="submitting">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useMessage } from '@/components/message'
import router from '@/router'
import {
  departmentNameService,
  updateDescriptionService,
  updatePasswordService
} from '@/services/UserService'
import { useUserStore } from '@/stores/UserStore'
import { onMounted, ref } from 'vue'

const userStore = useUserStore()
let user = userStore.UserS

const message = useMessage()
const departmentName = ref('')
const dialogFormVisible1 = ref(false)
const dialogFormVisible2 = ref(false)
const submitting = ref(false)

const newUser = ref({
  password: '',
  description: ''
})

// 获取部门名称
const getDepartmentName = async () => {
  try {
    departmentName.value = await departmentNameService()
    console.log(departmentName.value)
  } catch (error) {
    message.error('部门名称错误')
  }
}

// 打开弹窗1
const openDialog1 = () => {
  dialogFormVisible1.value = true
  newUser.value.password = ''
}

// 打开弹窗2
const openDialog2 = () => {
  dialogFormVisible2.value = true
  newUser.value.description = user.value?.description || ''
}

// 修改密码
const handleConfirm1 = async () => {
  submitting.value = true
  const path = await updatePasswordService(newUser.value)
  dialogFormVisible1.value = false
  path &&
    router.push(path).then(() => {
      message.warning('请重新登录！')
    })
}

// 更新信息
const handleConfirm2 = async () => {
  submitting.value = true
  try {
    await updateDescriptionService(newUser.value)
    dialogFormVisible2.value = false
    message.success('更新成功!')
  } catch (err: any) {
    message.error(err)
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  getDepartmentName()
})
</script>

<style scoped>
.button-info {
  margin-left: 24px;
}
:deep(.el-descriptions__title) {
  font-size: 24px !important;
  margin-left: 15px;
}
</style>
