<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'ApiRadioGroup'
  })
</script>

<script setup lang="ts">
  import { ref, watchEffect, computed, unref, watch } from 'vue'
  import { Radio } from 'ant-design-vue'
  import { isFunction } from '@/utils/is'
  import { useRuleFormItem } from '@/composables/component/useFormItem'
  import { useAttrs } from '@/composables/core/useAttrs'
  import { propTypes } from '@/utils/propTypes'
  import { get, omit } from 'lodash-es'
  // import { useI18n } from '/@/hooks/web/useI18n';
  type OptionsItem = { label: string; value: string | number | boolean; disabled?: boolean }

  // component
  const RadioGroup = Radio.Group
  const RadioButton = Radio.Button

  // props
  const props = withDefaults(
    defineProps<{
      api?: Nullable<(arg?: Recordable | string) => Promise<OptionsItem[]>>
      params?: Recordable | string
      value?: string | number | boolean
      isBtn?: boolean
      numberToString?: boolean
      resultField?: string
      labelField?: string
      valueField?: string
      immediate?: boolean
    }>(),
    {
      api: () => null,
      params: () => ({}),
      isBtn: false,
      resultField: '',
      labelField: 'label',
      valueField: 'value',
      immediate: true
    }
  )

  const emit = defineEmits<{
    (e: 'options-change', options: OptionsItem[]): void
    (e: 'change', res: any): void
  }>()

  // main
  const options = ref<OptionsItem[]>([])
  const loading = ref(false)
  const isFirstLoad = ref(true)
  const emitData = ref<any[]>([])
  const attrs = useAttrs()
  // const { t } = useI18n();
  // Embedded in the form, just use the hook binding to perform form verification
  const [state] = useRuleFormItem(props)

  // Processing options value
  const getOptions = computed(() => {
    const { labelField, valueField, numberToString } = props

    return unref(options).reduce((prev, next: Recordable) => {
      if (next) {
        const value = next[valueField]
        prev.push({
          label: next[labelField],
          value: numberToString ? `${value}` : value,
          ...omit(next, [labelField, valueField])
        })
      }
      return prev
    }, [] as OptionsItem[])
  })

  watchEffect(() => {
    props.immediate && fetch()
  })

  watch(
    () => props.params,
    () => {
      !unref(isFirstLoad) && fetch()
    },
    { deep: true }
  )

  async function fetch() {
    const api = props.api
    if (!api || !isFunction(api)) return
    options.value = []
    try {
      loading.value = true
      const res = await api(props.params)
      if (Array.isArray(res)) {
        options.value = res
        emitChange()
        return
      }
      if (props.resultField) {
        options.value = get(res, props.resultField) || []
      }
      emitChange()
    } catch (error) {
      console.warn(error)
    } finally {
      loading.value = false
    }
  }

  function emitChange() {
    emit('options-change', unref(getOptions))
  }

  function handleChange(_, ...args) {
    emitData.value = args
  }
</script>

<template>
  <RadioGroup v-bind="attrs" v-model:value="state" button-style="solid" @change="handleChange">
    <template v-for="item in getOptions" :key="`${item.value}`">
      <RadioButton v-if="props.isBtn" :value="item.value" :disabled="item.disabled">
        {{ item.label }}
      </RadioButton>
      <Radio v-else :value="item.value" :disabled="item.disabled">
        {{ item.label }}
      </Radio>
    </template>
  </RadioGroup>
</template>
