import { nextTick, onMounted, onActivated } from 'vue'
import { Fn } from '@/types/global'

export function onMountedOrActivated(hook: Fn) {
  let mounted: boolean

  onMounted(() => {
    hook()
    nextTick(() => {
      mounted = true
    })
  })

  onActivated(() => {
    if (mounted) {
      hook()
    }
  })
}
