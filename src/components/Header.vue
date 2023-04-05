<template>
  <div class="header">
    <div class="left">
      <span style="font-size: 20px">{{ state.name }}</span>
    </div>
    <div class="right">
      <el-popover
        placement="bottom"
        trigger="click"
        popper-class="poper-user-box"
        :width="320"
      >
        <template #reference>
          <div class="author">
            <el-icon><User /></el-icon>
            {{ state.userInfo?.nickName || "" }}
            <el-icon><CaretBottom /></el-icon>
          </div>
        </template>
        <div class="nickname">
          <p>登录名：{{ state.userInfo?.loginUserName || "" }}</p>
          <p>昵称：{{ state.userInfo?.nickName || "" }}</p>
          <el-tag size="small" effect="dark" class="logout" @click="logout"
            >退出</el-tag
          >
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { pathMap, localRemove } from "@/utils";
import axios from "@/utils/axios";

type userInfoKeys = "nickName" | "loginUserName";

interface State {
  name: string;
  userInfo: null | { [key in userInfoKeys]: unknown };
}

const router = useRouter();
const state: State = reactive({ name: "dashboard", userInfo: null });

const getUserInfo = async () => {
  const userInfo = await axios.get("/adminUser/profile");
  state.userInfo = userInfo as unknown as typeof state.userInfo;
};

const logout = () => {
  axios.delete("/logout").then(() => {
    localRemove("token");
    router.push("?#/login");
  });
};

onMounted(() => {
  const pathname = window.location.hash.split("/")[1] || "";
  if (!["login"].includes(pathname)) {
    getUserInfo();
  }
});

router.afterEach((to) => {
  state.name = pathMap[to.name as keyof typeof pathMap];
});
</script>

<style scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.right .el-icon {
  font-size: 18px;
  margin: 0 6px;
}

.author {
  margin-left: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
<style>
.poper-user-box {
  background: url("https://s.yezgea02.com/lingling-h5/static/account-banner-bg.png")
    50% 50% no-repeat !important;
  background-size: cover !important;
  border-radius: 0 !important;
}

.poper-user-box .nickname {
  position: relative;
  color: #fff;
}

.poper-user-box .logout {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}
</style>
