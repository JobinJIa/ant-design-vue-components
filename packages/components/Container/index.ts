import { withInstall } from '@/utils'
import collapseContainer from './collapse/CollapseContainer.vue'
import scrollContainer from './ScrollContainer.vue'
import lazyContainer from './LazyContainer.vue'

export const CollapseContainer = withInstall(collapseContainer)
export const ScrollContainer = withInstall(scrollContainer)
export const LazyContainer = withInstall(lazyContainer)

export {
  ScrollType,
  CollapseContainerOptions,
  ScrollContainerOptions,
  ScrollActionType
} from './typing'
