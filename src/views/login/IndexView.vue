<template>
  <div class="container-img">
    <img src="../../assets/images/帽儿山.jpg" alt="校园风景" class="w-full h-full object-cover" />
  </div>
  <el-row style="z-index: 1000">
    <el-col :span="6" :offset="9" class="mt-64">
      <el-card class="box-card">
        <div class="car-header mb-4">
          <el-row>
            <el-col :span="4" :offset="2">
              <img src="../../assets/images/校徽.jpg" alt="校徽" class="h-20 object-cover" />
            </el-col>
            <el-col :span="12" :offset="1" class="content-center">
              <p class="card-title">毕业设计管理系统</p>
            </el-col>
          </el-row>
        </div>
        <el-form :model="form" :rules="rules" ref="formRef" label-width="80px" class="w-80">
          <el-form-item label="账号" prop="number">
            <el-input v-model="form.number" placeholder="请输入账号" :prefix-icon="User" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
              show-password />
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          :loading="loading"
          class="mt-5 mb-5 ml-16 w-64"
          @click="handleLogin">
          登录
        </el-button>
      </el-card>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import { useMessage } from '@/components/message'
import router from '@/router'
import { loginService } from '@/services/LoginService'
import type { User } from '@/types'
import { Lock } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
import { ref } from 'vue'

const message = useMessage()
const form = ref<User>({})
const loading = ref(false)
const formRef = ref<FormInstance>()

// 登录(Axios)
const handleLogin = async () => {
  // loginService内跳转，如果try，catch，finally则路径变但页面不跳转
  const formRule = await formRef.value?.validate()
  if (!formRule) return
  const path = await loginService({
    number: form.value.number,
    password: form.value.password
  })
  path &&
    router.push(path).then(() => {
      message.success('登录成功！')
    })
}

// 表单验证规则
const rules = {
  number: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 5, max: 20, message: '长度在5到20个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 20, message: '长度在5到20个字符', trigger: 'blur' }
  ]
}
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
