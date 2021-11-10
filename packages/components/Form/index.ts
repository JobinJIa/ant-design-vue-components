import vcBasicForm from './VCBasicForm.vue'
import vcFormItem from './FormItem'
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

VCBasicForm.useForm = useForm

export { useForm, useComponentRegister, VCBasicForm, VCFormItem }
export default VCBasicForm
