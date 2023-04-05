<template>
  <div class="footer">
    <div class="left">
      Copyright ©{{ new Date().getFullYear() }} All rights reserved.
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.footer {
  height: 50px;
  border-top: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
</style>
