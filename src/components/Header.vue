<template>
  <div class="header">
    <div class="left">
      <span style="font-size: 20px">{{ state.name }}</span>
    </div>
    <div class="right">右</div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { pathMap } from "@/utils";

const router = useRouter();
const state = reactive({ name: "首页" });
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
</style>
