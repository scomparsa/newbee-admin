<template>
  <div class="layout">
    <el-container class="container" v-if="state.showMenu">
      <el-aside class="aside">
        <div class="head">
          <div>
            <img src="//s.weituibao.com/1582958061265/mlogo.png" alt="logo" />
            <span>vue3 admin</span>
          </div>
        </div>
        <div class="line" />
        <el-menu background-color="#222832" text-color="#fff" :router="true">
          <el-sub-menu index="1">
            <template #title>
              <span>Dashboard</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/">
                <el-icon><DataLine /></el-icon>大盘数据
              </el-menu-item>
              <el-menu-item index="/add">
                <el-icon><DataLine /></el-icon>添加商品
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container class="content">
        <Header />
        <div class="main">
          <router-view />
        </div>
        <Footer />
      </el-container>
    </el-container>
    <el-container class="container" v-else>
      <router-view />
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { localGet, pathMap } from "@/utils";

const noMenu = ["/login"];
const router = useRouter();
const state = reactive({ showMenu: true });

router.beforeEach((to, _, next) => {
  if (to.path == "/login") {
    next();
  } else {
    if (!localGet("token")) {
      window.location.href = "?#/login";
    } else {
      next();
    }
  }

  state.showMenu = !noMenu.includes(to.path);
  document.title = `${pathMap[to.name as keyof typeof pathMap]} | 新蜂商城`;
});
</script>

<style scoped>
.layout {
  min-height: 100vh;
  background-color: #ffffff;
}
.container {
  height: 100vh;
}
.aside {
  width: 200px !important;
  background-color: #222832;
}
.head {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}
.head > div {
  display: flex;
  align-items: center;
}

.head img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.head span {
  font-size: 20px;
  color: #ffffff;
}
.line {
  border-top: 1px solid hsla(0, 0%, 100%, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.content {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;
}
.main {
  height: calc(100vh - 100px);
  overflow: auto;
  padding: 10px;
}

.el-menu {
  border-right: 0;
}
</style>

<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
