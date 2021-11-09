<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ApiSelect",
  inheritAttrs: false
});
</script>

<script setup lang="ts">
import { PropType, ref, watchEffect, computed, unref, watch } from 'vue';
import { Select } from 'ant-design-vue';
import { isFunction } from '@/utils/is';
import { useRuleFormItem } from '@/composables/component/useFormItem';
import { get, omit } from 'lodash-es';
import { useAttrs } from '@/composables/core/useAttrs';
import { LoadingOutlined } from '@ant-design/icons-vue';
// import { useI18n } from '/@/hooks/web/useI18n';
// import { propTypes } from '/@/utils/propTypes';

type OptionsItem = { label: string; value: string; disabled?: boolean };

const props = withDefaults(defineProps<{
  value?: any
  numberToString?: boolean
  api?: Nullable<(arg?: Recordable) => Promise<OptionsItem[]>>
  params?: Recordable
  resultField?: string
  labelField?: string
  valueField?: string
  immediate?: boolean
}>(), {
  api: () => null,
  params: () => ({}),
  resultField: '',
  labelField: 'label',
  valueField: 'value',
  immediate: true
})

const emit = defineEmits<{
  (e: 'options-change', options: OptionsItem[]): void
  (e: 'change', res: any): void
}>()

// main
const options = ref<OptionsItem[]>([]);
const loading = ref(false);
const isFirstLoad = ref(true);
const emitData = ref<any[]>([]);
const attrs = useAttrs();

// Embedded in the form, just use the hook binding to perform form verification
const [state] = useRuleFormItem(props, 'value', 'change', emitData);

const getOptions = computed(() => {
  const { labelField, valueField, numberToString } = props;

  return unref(options).reduce((prev, next: Recordable) => {
    if (next) {
      const value = next[valueField];
      prev.push({
        ...omit(next, [labelField, valueField]),
        label: next[labelField],
        value: numberToString ? `${value}` : value,
      });
    }
    return prev;
  }, [] as OptionsItem[]);
});

watchEffect(() => {
  props.immediate && fetch();
});

watch(
  () => props.params,
  () => {
    !unref(isFirstLoad) && fetch();
  },
  { deep: true },
);

async function fetch() {
  const api = props.api;
  if (!api || !isFunction(api)) return;
  options.value = [];
  try {
    loading.value = true;
    const res = await api(props.params);
    if (Array.isArray(res)) {
      options.value = res;
      emitChange();
      return;
    }
    if (props.resultField) {
      options.value = get(res, props.resultField) || [];
    }
    emitChange();
  } catch (error) {
    console.warn(error);
  } finally {
    loading.value = false;
  }
}

async function handleFetch() {
  if (!props.immediate && unref(isFirstLoad)) {
    await fetch();
    isFirstLoad.value = false;
  }
}

function emitChange() {
  emit('options-change', unref(getOptions));
}

function handleChange(_, ...args) {
  emitData.value = args;
}

</script>

<template>
  <Select
    @dropdownVisibleChange="handleFetch"
    v-bind="$attrs"
    @change="handleChange"
    :options="getOptions"
    v-model:value="state"
  >
    <template #[item]="data" v-for="item in Object.keys($slots)">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
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
  </Select>
</template>
