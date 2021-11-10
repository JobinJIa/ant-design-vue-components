<script lang="ts">
  export default {
    name: 'ApiTreeSelect'
  }
</script>

<script setup lang="ts">
  import type { Recordable, Nullable } from '@/types/global'
  import { computed, watch, ref, onMounted, unref, useAttrs } from 'vue'
  import { TreeSelect as ATreeSelect } from 'ant-design-vue'
  import { isArray, isFunction } from '@/utils/is'
  import { get } from 'lodash-es'
  import { LoadingOutlined } from '@ant-design/icons-vue'
  // import { propTypes } from '/@/utils/propTypes';

  // props
  const props = withDefaults(
    defineProps<{
      api?: Nullable<(arg?: Recordable) => Promise<Recordable>>
      params?: Recordable
      immediate?: boolean
      resultField?: string
    }>(),
    {
      api: () => null,
      params: () => ({}),
      immediate: true,
      resultField: ''
    }
  )

  // emit
  const emit = defineEmits<{
    (e: 'options-change', options: Recordable[]): void
    (e: 'change', res: any[]): void
  }>()

  // attrs
  const attrs = useAttrs()

  // main
  const treeData = ref<Recordable[]>([])
  const isFirstLoaded = ref<Boolean>(false)
  const loading = ref(false)
  const getAttrs = computed(() => {
    return {
      ...(props.api ? { treeData: unref(treeData) } : {}),
      ...attrs
    }
  })

  function handleChange(...args) {
    emit('change', args)
  }

  watch(
    () => props.params,
    () => {
      !unref(isFirstLoaded) && fetch()
    },
    { deep: true }
  )

  watch(
    () => props.immediate,
    (v) => {
      v && !isFirstLoaded.value && fetch()
    }
  )

  onMounted(() => {
    props.immediate && fetch()
  })

  async function fetch() {
    const { api } = props
    if (!api || !isFunction(api)) return
    loading.value = true
    treeData.value = []
    let result
    try {
      result = await api(props.params)
    } catch (e) {
      console.error(e)
    }
    loading.value = false
    if (!result) return
    if (!isArray(result)) {
      result = get(result, props.resultField)
    }
    treeData.value = (result as Recordable[]) || []
    isFirstLoaded.value = true
    emit('options-change', treeData.value)
  }
</script>

<template>
  <a-tree-select v-bind="getAttrs" @change="handleChange">
    <template #[item]="data" v-for="item in Object.keys($slots)">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
    <template #suffixIcon v-if="loading">
      <LoadingOutlined spin />
    </template>
  </a-tree-select>
</template>
