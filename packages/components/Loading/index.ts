import vcLoading from './VCLoading.vue'
import { Plugin } from 'vue'
import { withInstall } from '@/utils'
import { useLoading } from './composables/useLoading'
import type { LoadingProps } from './typing'

const VCLoading = withInstall(vcLoading) as typeof vcLoading & Plugin

export default VCLoading

export { VCLoading, useLoading }

export type { LoadingProps }
