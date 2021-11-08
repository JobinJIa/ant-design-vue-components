<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "FormAction"
})
</script>

<script setup lang="ts">
import type { ColEx } from './types/index';
//import type { ButtonProps } from 'ant-design-vue/es/button/buttonTypes';
import { computed, PropType } from 'vue';
import { Form, Col as ACol } from 'ant-design-vue';
import { VCButton as Button, ButtonProps } from '@/components/Button';
import { VCBasicArrow as BasicArrow } from '@/components/Basic';
import { useFormContext } from './composables/useFormContext';
// import { useI18n } from '/@/hooks/web/useI18n';
import { propTypes } from '@/utils/propTypes';

type ButtonOptions = Partial<ButtonProps> & { text?: string };

const FormItem = Form.Item

const props = withDefaults(defineProps<{
  showActionButtonGroup?: boolean
  showResetButton?: boolean
  showSubmitButton?: boolean
  showAdvancedButton?: boolean
  resetButtonOptions?: ButtonOptions
  submitButtonOptions?: ButtonOptions
  actionColOptions?: Partial<ColEx>
  actionSpan?: number
  isAdvanced?: boolean
  hideAdvanceBtn?: boolean
}>(), {
  showActionButtonGroup: true,
  showResetButton: true,
  showSubmitButton: true,
  showAdvancedButton: true,
  resetButtonOptions: () => ({}),
  submitButtonOptions: () => ({}),
  actionColOptions: () => ({}),
  actionSpan: 6
})

const emit = defineEmits<{
  (e: 'toggle-advanced'): void
}>()

const actionColOpt = computed(() => {
  const { showAdvancedButton, actionSpan: span, actionColOptions } = props;
  const actionSpan = 24 - span;
  const advancedSpanObj = showAdvancedButton
      ? { span: actionSpan < 6 ? 24 : actionSpan }
      : {};
  const actionColOpt: Partial<ColEx> = {
    style: { textAlign: 'right' },
    span: showAdvancedButton ? 6 : 4,
    ...advancedSpanObj,
    ...actionColOptions,
  };
  return actionColOpt;
});

const getResetBtnOptions = computed((): ButtonOptions => {
  return Object.assign(
      {
        // text: t('common.resetText'),
        text: '重置',
      },
      props.resetButtonOptions,
  );
});

const getSubmitBtnOptions = computed(() => {
  return Object.assign(
      {
        // text: t('common.queryText'),
        text: '查询',
      },
      props.submitButtonOptions,
  );
});


function toggleAdvanced() {
  emit('toggle-advanced');
}

const { resetAction, submitAction } = useFormContext()

</script>

<template>
  <a-col v-bind="actionColOpt" v-if="showActionButtonGroup">
    <div style="width: 100%" :style="{ textAlign: actionColOpt.style.textAlign }">
      <FormItem>
        <slot name="resetBefore"></slot>
        <Button
            type="default"
            class="mr-2"
            v-bind="getResetBtnOptions"
            @click="resetAction"
            v-if="showResetButton"
        >
          {{ getResetBtnOptions.text }}
        </Button>
        <slot name="submitBefore"></slot>

        <Button
            type="primary"
            class="mr-2"
            v-bind="getSubmitBtnOptions"
            @click="submitAction"
            v-if="showSubmitButton"
        >
          {{ getSubmitBtnOptions.text }}
        </Button>

        <slot name="advanceBefore"></slot>
        <Button
            type="link"
            size="small"
            @click="toggleAdvanced"
            v-if="showAdvancedButton && !hideAdvanceBtn"
        >
<!--          {{ isAdvanced ? t('component.form.putAway') : t('component.form.unfold') }}-->
          {{ isAdvanced ? '收起' : '展开' }}
          <BasicArrow class="ml-1" :expand="!isAdvanced" up />
        </Button>
        <slot name="advanceAfter"></slot>
      </FormItem>
    </div>
  </a-col>
</template>

<style scoped>

</style>