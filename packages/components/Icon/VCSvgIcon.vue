<script lang="ts">
  export default {
    name: 'VCSvgIcon'
  }
</script>

<script setup lang="ts">
  import type { CSSProperties } from 'vue'
  import { computed } from 'vue'

  const { prefix, name, size, spin } = withDefaults(
    defineProps<{
      prefix?: string
      name: string
      size: number | string
      spin?: boolean
    }>(),
    {
      prefix: 'icon',
      spin: false
    }
  )

  const symbolId = computed(() => `#${prefix}-${name}`)

  const style = computed((): CSSProperties => {
    let s = `${size}`
    s = `${s.replace('px', '')}px`
    return {
      width: s,
      height: s
    }
  })
</script>

<template>
  <svg
    :class="['s-svg-icon', $attrs.class, spin && 'svg-icon-spin']"
    :style="style"
    aria-hidden="true"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>

<style lang="less">
  .s-svg-icon {
    display: inline-block;
    overflow: hidden;
    vertical-align: -0.15em;
    fill: currentColor;
  }

  .svg-icon-spin {
    animation: loadingCircle 1s infinite linear;
  }
</style>
