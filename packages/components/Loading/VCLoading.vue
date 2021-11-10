<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'VCLoading'
  })
</script>

<script setup lang="ts">
  import { Spin } from 'ant-design-vue'
  import { SizeEnum } from '@/enums/sizeEnum'

  withDefaults(
    defineProps<{
      tip?: string
      size?: SizeEnum
      absolute?: boolean
      loading?: boolean
      background?: string
      theme?: 'dark' | 'light'
    }>(),
    {
      tip: '',
      size: SizeEnum.LARGE,
      absolute: false,
      loading: false,
      theme: 'light'
    }
  )
</script>

<template>
  <section
    class="full-loading"
    :class="{ absolute, [theme]: !!theme }"
    :style="[background ? `background-color: ${background}` : '']"
    v-show="loading"
  >
    <Spin v-bind="$attrs" :tip="tip" :size="size" :spinning="loading" />
  </section>
</template>
<style lang="less"></style>
