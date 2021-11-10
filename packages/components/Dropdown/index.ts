import { withInstall } from '@/utils'
import type { Plugin } from 'vue'
import dropdown from './Dropdown.vue'

export { DropMenu } from './typing'
export const Dropdown = withInstall(dropdown) as typeof dropdown & Plugin
