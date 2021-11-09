<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RadioButtonGroup"
});
</script>

<script setup lang="ts">
import { PropType, computed } from 'vue';
import { Radio } from 'ant-design-vue';
import { isString } from '@/utils/is';
import { useRuleFormItem } from '@/composables/component/useFormItem';
import { useAttrs } from '@/composables/core/useAttrs';

type OptionsItem = { label: string; value: string | number | boolean; disabled?: boolean };
type RadioItem = string | OptionsItem;

// components
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

// props
const props = withDefaults(defineProps<{
  value?: string | number | boolean
  options?: RadioItem[]
}>(), {
  options: () => ([])
})

// main
const attrs = useAttrs();
// Embedded in the form, just use the hook binding to perform form verification
const [state] = useRuleFormItem(props);

// Processing options value
const getOptions = computed((): OptionsItem[] => {
  const { options } = props;
  if (!options || options?.length === 0) return [];

  const isStringArr = options.some((item) => isString(item));
  if (!isStringArr) return options as OptionsItem[];

  return options.map((item) => ({ label: item, value: item })) as OptionsItem[];
});
</script>

<template>
  <RadioGroup v-bind="attrs" v-model:value="state" button-style="solid">
    <template v-for="item in getOptions" :key="`${item.value}`">
      <RadioButton :value="item.value" :disabled="item.disabled">
        {{ item.label }}
      </RadioButton>
    </template>
  </RadioGroup>
</template>
