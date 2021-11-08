<script setup lang="ts">
</script>

<template>
  <a-space>
    <VCButton color="success" >成功</VCButton>
    <VCButton color="error">失败</VCButton>
    <VCButton color="warning">警告</VCButton>
  </a-space>
  <a-divider></a-divider>
  <a-space>
    <VCIcon icon="ph:airplane"></VCIcon>
    <VCIcon icon="mdi-light:bell"></VCIcon>
    <VCIcon icon="noto-v1:anguished-face"></VCIcon>
    <VCIcon icon="emojione-v1:astonished-face"></VCIcon>
  </a-space>
  <a-divider></a-divider>
  <a-space>
    <VCLoading :loading="true"></VCLoading>
  </a-space>
</template>

<style scoped>

</style>
