<template>
  <!-- <div class="container-img">
    <img
      src="../../assets/images/帽儿山.jpg"
      alt="校园风景"
      style="width: 100%; height: 100%; object-fit: cover" />
  </div>
  <el-row style="z-index: 1000">
    <el-col :span="6" :offset="9" style="margin-top: 270px">
      <el-card class="box-card">
        <div class="car-header" style="margin-bottom: 15px">
          <el-row>
            <el-col :span="4" :offset="2">
              <img
                src="../../assets/images/校徽.jpg"
                alt="校徽"
                style="height: 80px; object-fit: cover" />
            </el-col>
            <el-col :span="12" :offset="1" style="align-content: center">
              <p class="card-title">毕业设计管理系统</p>
            </el-col>
          </el-row>
        </div>
        <el-form :model="form" label-width="60px" style="width: 350px">
          <el-form-item label="账号">
            <el-input v-model="form.number" placeholder="请输入账号" :prefix-icon="User" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="form.passwoed"
              type="password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
              show-password />
          </el-form-item>
        </el-form>
        <el-button type="primary" loading style="margin: 20px 0 20px 50px; width: 300px">
          登录
        </el-button>
      </el-card>
    </el-col>
  </el-row> -->
  <div class="p-8 bg-blue-800 mt-89">test</div>
  <p class="text-3xl font-bold underline">Hello world!</p>
  <div class="p-8 bg-red-900">test</div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  number: '',
  passwoed: ''
})
</script>
<style scoped>
.container-img {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.card-title {
  font-weight: bolder;
  font-size: 1.5rem;
  font-family: cursive;
}
.el-card.is-always-shadow {
  border-radius: 14px;
}
</style>
