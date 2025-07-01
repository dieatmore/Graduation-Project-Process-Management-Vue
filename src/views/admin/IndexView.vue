<template>
  <div class="w-screen h-screen">
    <!-- Header -->
    <div class="w-full h-[5%] border-black" style="border-bottom-width: 1px">
      <el-row class="items-center">
        <el-col :span="4" :offset="1">
          <img src="../../assets/images/schoolbadge.png" alt="校徽" class="object-cover h-11" />
        </el-col>
        <el-col :span="8" :offset="5">
          <span class="font-bold text-4xl font-cursive">毕业设计管理系统</span>
        </el-col>
        <el-col :span="4" :offset="1">
          <div class="flex items-center justify-end">
            <span>退出登录</span>
            <img src="../../assets/images/退出.png" alt="校徽" class="object-cover h-5 ml-2" />
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
              <span>专业管理</span>
            </el-menu-item>
            <el-menu-item index="/teachermanage">
              <el-icon><document /></el-icon>
              <span>教师管理</span>
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
import { Document, Menu as IconMenu } from '@element-plus/icons-vue'
</script>
<style scoped>
.bd {
  border: 1px solid red;
}
.font-cursive {
  font-family: cursive;
}
</style>
