<template>
  <div class="w-screen h-screen">
    <!-- Header -->
    <div class="w-full h-[5%] border-black" style="border-bottom-width: 1px">
      <el-row class="items-center">
        <el-col :span="4">
          <img src="@/assets/images/schoolbadge.png" alt="校徽" class="object-cover h-11" />
        </el-col>
        <el-col :span="2" :offset="7">
          <span style="margin-left: 50px; font-weight: bolder; font-size: 24px">教师端</span>
        </el-col>
        <el-col :span="6" :offset="5">
          <div class="flex items-center justify-center">
            <div class="flex mt-2 justify-center items-center user-info" @click="userInfo">
              <img src="@/assets/images/头像.png" alt="头像" class="object-cover h-5 ml-2" />
              <span style="margin-left: 10px; font-weight: bolder; font-size: larger">
                {{ user?.name }}
              </span>
            </div>
            <div @click="Logout" class="flex mt-2 justify-center items-center ml-12 logout">
              <span style="font-weight: bolder">退出登录</span>
              <img src="@/assets/images/退出.png" alt="校徽" class="object-cover h-5 ml-2" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="flex w-full h-[95%]">
      <!-- 左侧边栏 -->
      <div class="w-[10%] h-full border-black pt-4" style="border-right-width: 1px">
        <el-col :span="24">
          <el-menu default-active="/departmentmanage" class="el-menu-vertical-demo" router>
            <el-menu-item index="/departmentmanage">
              <el-icon><icon-menu /></el-icon>
              <span style="font-weight: bolder">专业管理</span>
            </el-menu-item>
            <el-menu-item index="/teachermanage">
              <el-icon><document /></el-icon>
              <span style="font-weight: bolder">教师管理</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </div>
      <!-- 右侧详情 -->
      <div class="w-[90%] h-full">
        <RouterView />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import router from '@/router'
import { useDepartmentStore } from '@/stores/DepartmentStore'
import { useUserStore } from '@/stores/UserStore'
import { Document, Menu as IconMenu } from '@element-plus/icons-vue'

const userStore = useUserStore()
let user = userStore.UserS

// 个人信息
const userInfo = () => {
  router.push('/userinfo')
}

// 退出登录
const Logout = () => {
  sessionStorage.clear()
  useUserStore().clear()
  useDepartmentStore().clear()
  router.replace('/login')
}
</script>
<style scoped>
.font-cursive {
  /* font-family: cursive; */
}
.logout {
  opacity: 0.7;
}
.logout:hover {
  opacity: 1;
}
.user-info {
  opacity: 0.7;
}
.user-info:hover {
  opacity: 1;
}
</style>
