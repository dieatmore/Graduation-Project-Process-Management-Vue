<template>
  <div class="w-full h-screen bd flex">
    <div class="w-[15%] h-full bg-[#545c64]">
      <el-col :span="24">
        <p class="mb-8 text-white font-bold text-3xl">后台管理</p>
        <br />
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff">
          <el-menu-item index="1">
            <el-icon><location /></el-icon>
            <span>专业管理</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <span>老师管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </div>
    <div class="w-[85%] h-full bd"></div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.bd {
  border: 1px solid red;
}
</style>
