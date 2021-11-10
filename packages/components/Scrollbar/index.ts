/**
 * copy from element-ui
 */

import scrollbar from './Scrollbar.vue'
import type { Plugin } from 'vue'
import { withInstall } from '@/utils'

const Scrollbar = withInstall(scrollbar) as typeof scrollbar & Plugin

export { Scrollbar }
export type { ScrollbarType } from './types'
