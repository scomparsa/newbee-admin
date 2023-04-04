<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <img
          src="https://s.weituibao.com/1582958061265/mlogo.png"
          alt="logo"
          class="logo"
        />
        <div class="name">
          <div class="title">新蜂商城</div>
          <div class="tips">Vue3.0 后台管理系统</div>
        </div>
      </div>
      <el-form
        class="login-form"
        label-position="top"
        ref="loginForm"
        :model="state.ruleForm"
        :rules="state.rules"
        @submit="submitForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            type="text"
            autocomplete="off"
            placeholder="admin"
            v-model.trim="state.ruleForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            autocomplete="off"
            placeholder="123456"
            v-model.trim="state.ruleForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div style="color: #333">登录表示您已同意<a>《服务条款》</a></div>
          <el-button style="width: 100%" type="primary" native-type="submit"
            >立即登录</el-button
          >
          <el-checkbox v-model="state.checked" @change="!state.checked"
            >下次自动登录</el-checkbox
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { ElForm } from "element-plus";
import { Md5 } from "ts-md5";
import axios from "@/utils/axios";
import { localSet } from "@/utils/index";

const loginForm = ref<InstanceType<typeof ElForm>>();
const state = reactive({
  ruleForm: {
    username: "",
    password: "",
  },
  checked: true,
  rules: {
    username: [{ required: true, message: "账号不能为空", trigger: "blur" }],
    password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
  },
});

const submitForm = async () => {
  loginForm.value?.validate((valid) => {
    if (valid) {
      axios
        .post<any, string>("/adminUser/login", {
          userName: state.ruleForm.username || "",
          passwordMd5: Md5.hashStr(state.ruleForm.password),
        })
        .then((res) => {
          localSet("token", res);
          window.location.href = "/";
        });
    } else {
      console.error("error submit!!");
      return false;
    }
  });
};
</script>

<style scoped>
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
}

.login-container {
  width: 420px;
  height: 500px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 21px 41px 0 rgba(0, 0, 0, 0.2);
}

.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 20px;
}

.head img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}

.head .title {
  font-size: 28px;
  color: #1baeae;
  font-weight: bold;
}

.head .tips {
  font-size: 12px;
  color: #999;
}

.login-form {
  width: 70%;
  margin: 0 auto;
}
</style>
