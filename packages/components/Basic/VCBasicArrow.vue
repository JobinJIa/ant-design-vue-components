<script lang="ts">
  export default {
    name: 'VCBasicArrow'
  }
</script>

<script setup lang="ts">
  import { VCIcon as Icon } from '@/components/Icon'
  import { useDesign } from '@/composables/web/useDesign'
  import { computed } from 'vue'

  const props = defineProps<{
    expand?: boolean
    up?: boolean
    down?: boolean
    inset?: boolean
  }>()

  const { prefixCls } = useDesign('basic-arrow')

  // get component class
  const getClass = computed(() => {
    const { expand, up, down, inset } = props
    return [
      prefixCls,
      {
        [`vc--active`]: expand,
        up,
        inset,
        down
      }
    ]
  })
</script>

<template>
  <span :class="getClass">
    <Icon icon="ion:chevron-forward" :style="$attrs.iconStyle" />
  </span>
</template>

<style lang="less">
  .vc-basic-arrow {
    display: inline-block;
    cursor: pointer;
    transform: rotate(0deg);
    transition: all 0.3s ease 0.1s;
    transform-origin: center center;

    &--active {
      transform: rotate(90deg);
    }

    &.inset {
      line-height: 0px;
    }

    &.up {
      transform: rotate(-90deg);
    }

    &.down {
      transform: rotate(90deg);
    }

    &.up.vc--active {
      transform: rotate(90deg);
    }

    &.down.vc--active {
      transform: rotate(-90deg);
    }
  }
</style>
