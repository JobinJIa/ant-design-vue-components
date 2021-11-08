import vcBasicForm from './VCBasicForm.vue'
import { useForm } from './composables/useForm'
import { withInstall } from '@/utils'
import { Plugin } from 'vue'

export * from './types/index'
export * from './types/form'
export * from './types/formItem'
export * from './types/composables'

const VCBasicForm = withInstall(vcBasicForm) as typeof vcBasicForm & Plugin

VCBasicForm.useForm = useForm

export { useForm }
export default VCBasicForm
