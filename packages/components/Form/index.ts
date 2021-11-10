import vcBasicForm from './VCBasicForm.vue'
import vcFormItem from './FormItem'
import apiTreeSelect from './components/ApiTreeSelect.vue'
import apiCascader from './components/ApiCascader.vue'
import apiSelect from './components/ApiSelect.vue'
import apiRadioGroup from './components/ApiRadioGroup.vue'
import radioButtonGroup from './components/RadioButtonGroup.vue'
import { useForm } from './composables/useForm'
import { useComponentRegister } from './composables/useComponentRegister'
import { withInstall } from '@/utils'
import { Plugin } from 'vue'

import type { ComponentType } from './types/index'
import type { FormItem } from './types/formItem'
import type {
  FieldMapToTime,
  RenderCallbackParams,
  FormActionType,
  RegisterFn,
  UseFormReturnType,
  FormProps,
  FormSchema,
  HelpComponentProps
} from './types/form'

export type {
  ComponentType,
  FormItem,
  FieldMapToTime,
  RenderCallbackParams,
  FormActionType,
  RegisterFn,
  UseFormReturnType,
  FormProps,
  FormSchema,
  HelpComponentProps
}

const VCBasicForm = withInstall(vcBasicForm) as typeof vcBasicForm & Plugin
const VCFormItem = withInstall(vcFormItem) as typeof vcFormItem & Plugin
const ApiTreeSelect = withInstall(apiTreeSelect) as typeof apiTreeSelect & Plugin
const ApiCascader = withInstall(apiCascader) as typeof apiCascader & Plugin
const ApiSelect = withInstall(apiSelect) as typeof apiSelect & Plugin
const ApiRadioGroup = withInstall(apiRadioGroup) as typeof apiRadioGroup & Plugin
const RadioButtonGroup = withInstall(radioButtonGroup) as typeof radioButtonGroup & Plugin

VCBasicForm.useForm = useForm

export {
  useForm,
  useComponentRegister,
  VCBasicForm,
  VCFormItem,
  ApiCascader,
  ApiRadioGroup,
  ApiSelect,
  ApiTreeSelect,
  RadioButtonGroup
}
export default VCBasicForm
