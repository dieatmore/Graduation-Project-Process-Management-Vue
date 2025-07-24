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
          <el-button type="primary">修改密码</el-button>
          <el-button type="success" class="button-info">添加详细信息</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useMessage } from '@/components/message'
import { departmentNameService } from '@/services/UserService'
import { useUserStore } from '@/stores/UserStore'
import { onMounted, ref } from 'vue'

const userStore = useUserStore()
let user = userStore.UserS

const message = useMessage()
const departmentName = ref('')

const getDepartmentName = async () => {
  try {
    departmentName.value = await departmentNameService()
    console.log(departmentName.value)
  } catch (error) {
    message.error('部门名称错误')
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
