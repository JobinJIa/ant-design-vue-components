<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'VCIcon'
  })
</script>

<script setup lang="ts">
  import SvgIcon from './VCSvgIcon.vue'
  import {
    ref,
    watch,
    onMounted,
    nextTick,
    unref,
    computed,
    CSSProperties
  } from 'vue'
  import Iconify from '@purge-icons/generated'
  import { isString } from '@/utils/is'

  const SVG_END_WITH_FLAG = '|svg'

  const props = withDefaults(
    defineProps<{
      icon: string
      color?: string
      size?: string | number
      spin?: boolean
      prefix?: string
    }>(),
    {
      size: 16,
      spin: false,
      prefix: ''
    }
  )

  const elRef = ref<ElRef>(null)
  const isSvgIcon = computed(() => props.icon?.endsWith(SVG_END_WITH_FLAG))
  const getSvgIcon = computed(() => props.icon.replace(SVG_END_WITH_FLAG, ''))
  const getIconRef = computed(() => `${props.prefix ? props.prefix + ':' : ''}${props.icon}`)

  const update = async () => {
    if (unref(isSvgIcon)) return

    const el = unref(elRef)
    if (!el) return

    await nextTick()
    const icon = unref(getIconRef)
    if (!icon) return

    const svg = Iconify.renderSVG(icon, {})
    if (svg) {
      el.textContent = ''
      el.appendChild(svg)
    } else {
      const span = document.createElement('span')
      span.className = 'iconify'
      span.dataset.icon = icon
      el.textContent = ''
      el.appendChild(span)
    }
  }

  const getWrapStyle = computed((): CSSProperties => {
    const { size, color } = props
    let fs = size
    if (isString(size)) {
      fs = parseInt(size, 10)
    }

    return {
      fontSize: `${fs}px`,
      color: color,
      display: 'inline-flex'
    }
  })

  watch(() => props.icon, update, { flush: 'post' })

  onMounted(update)
</script>

<template>
  <SvgIcon
    :size="size"
    :name="getSvgIcon"
    v-if="isSvgIcon"
    :class="[$attrs.class, 'anticon']"
    :spin="spin"
  />
  <span
    v-else
    ref="elRef"
    :class="[$attrs.class, 'app-iconify anticon', spin && 'app-iconify-spin']"
    :style="getWrapStyle"
  ></span>
</template>
