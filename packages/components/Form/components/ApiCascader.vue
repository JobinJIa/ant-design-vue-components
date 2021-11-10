<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'ApiCascader'
  })
</script>

<script setup lang="ts">
  import { ref, unref, watch, watchEffect } from 'vue'
  import { Cascader as ACascader } from 'ant-design-vue'
  // import { propTypes } from '@/utils/propTypes'
  import { isFunction } from '@/utils/is'
  import { get, omit } from 'lodash-es'
  import { useRuleFormItem } from '@/composables/component/useFormItem'
  import { LoadingOutlined } from '@ant-design/icons-vue'

  interface Option {
    value: string
    label: string
    loading?: boolean
    isLeaf?: boolean
    children?: Option[]
  }

  // props
  const props = withDefaults(
    defineProps<{
      value?: any[]
      api?: Nullable<(arg?: Recordable) => Promise<Option[]>>
      numberToString?: boolean
      resultField?: string
      labelField?: string
      valueField?: string
      childrenField?: string
      asyncFetchParamKey?: string
      immediate?: boolean
      initFetchParams?: Recordable
      isLeaf?: (arg: Recordable) => boolean | boolean
      displayRenderArray?: string[]
    }>(),
    {
      api: () => null,
      resultField: '',
      labelField: 'label',
      valueField: 'value',
      childrenField: 'children',
      asyncFetchParamKey: 'parentCode',
      immediate: true,
      isLeaf: () => true,
      displayRenderArray: () => []
    }
  )

  // emit
  const emit = defineEmits<{
    (e: 'change', res: any): void
    (e: 'defaultChange', keys: any[], args: any): void
  }>()

  // main
  const apiData = ref<any[]>([])
  const options = ref<Option[]>([])
  const loading = ref<boolean>(false)
  const emitData = ref<any[]>([])
  const isFirstLoad = ref(true)

  // Embedded in the form, just use the hook binding to perform form verification
  const [state] = useRuleFormItem(props, 'value', 'change', emitData)

  watch(
    apiData,
    (data) => {
      const opts = generatorOptions(data)
      options.value = opts
    },
    { deep: true }
  )

  function generatorOptions(options: any[]): Option[] {
    const { labelField, valueField, numberToString, childrenField, isLeaf } = props
    return options.reduce((prev, next: Recordable) => {
      if (next) {
        const value = next[valueField]
        const item = {
          ...omit(next, [labelField, valueField]),
          label: next[labelField],
          value: numberToString ? `${value}` : value,
          isLeaf: isLeaf && typeof isLeaf === 'function' ? isLeaf(next) : false
        }
        const children = Reflect.get(next, childrenField)
        if (children) {
          Reflect.set(item, childrenField, generatorOptions(children))
        }
        prev.push(item)
      }
      return prev
    }, [] as Option[])
  }

  async function initialFetch() {
    const api = props.api
    if (!api || !isFunction(api)) return
    apiData.value = []
    loading.value = true
    try {
      const res = await api(props.initFetchParams)
      if (Array.isArray(res)) {
        apiData.value = res
        return
      }
      if (props.resultField) {
        apiData.value = get(res, props.resultField) || []
      }
    } catch (error) {
      console.warn(error)
    } finally {
      loading.value = false
    }
  }

  async function loadData(selectedOptions: Option[]) {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true

    const api = props.api
    if (!api || !isFunction(api)) return
    try {
      const res = await api({
        [props.asyncFetchParamKey]: Reflect.get(targetOption, 'value')
      })
      if (Array.isArray(res)) {
        const children = generatorOptions(res)
        targetOption.children = children
        return
      }
      if (props.resultField) {
        const children = generatorOptions(get(res, props.resultField) || [])
        targetOption.children = children
      }
    } catch (e) {
      console.error(e)
    } finally {
      targetOption.loading = false
    }
  }

  watchEffect(() => {
    props.immediate && initialFetch()
  })

  watch(
    () => props.initFetchParams,
    () => {
      !unref(isFirstLoad) && initialFetch()
    },
    { deep: true }
  )

  function handleChange(keys, args) {
    emitData.value = keys
    emit('defaultChange', keys, args)
  }

  function handleRenderDisplay({ labels, selectedOptions }) {
    if (unref(emitData).length === selectedOptions.length) {
      return labels.join(' / ')
    }
    if (props.displayRenderArray) {
      return props.displayRenderArray.join(' / ')
    }
    return ''
  }
</script>

<template>
  <a-cascader
    v-model:value="state"
    :options="options"
    :load-data="loadData"
    change-on-select
    @change="handleChange"
    :displayRender="handleRenderDisplay"
  >
    <template #suffixIcon v-if="loading">
      <LoadingOutlined spin />
    </template>
    <template #notFoundContent v-if="loading">
      <span>
        <LoadingOutlined spin class="mr-1" />
        <!--        {{ t('component.form.apiSelectNotFound') }}-->
        请等待数据加载完成...
      </span>
    </template>
  </a-cascader>
</template>
