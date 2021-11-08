import vcLoading from './VCLoading.vue'
import { Plugin } from 'vue'
import { withInstall } from '@/utils'
import { useLoading } from './composables/useLoading'

const VCLoading = withInstall(vcLoading) as typeof vcLoading & Plugin

VCLoading.useLoading = useLoading

export default VCLoading
