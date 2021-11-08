<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'VCButton',
  inheritAttrs: false
})
</script>

<script setup lang="ts">
import { Button } from 'ant-design-vue'
import {computed, useAttrs} from "vue";
const props = withDefaults(defineProps<{
  color?: 'error' | 'warning' | 'success'
  loading?: boolean
  disabled?: boolean
}>(), {})
const attrs = useAttrs()

const bindValue = computed(() => {
  return {
    ...props,
    ...attrs
  }
})

const getButtonClass = computed(() => {
  const { color, disabled } = props;
  return [
    {
      [`ant-btn-${color}`]: !!color,
      [`is-disabled`]: disabled,
    }
  ]
})

</script>

<template>
  <Button v-bind="bindValue" :class="getButtonClass">
    <slot></slot>
  </Button>
</template>

<style lang="less">
  @import "./index.less";
</style>
