import { defineComponent, ref, toRefs, PropType } from 'vue'
import { createAppProviderContext } from './composables/useAppContext'

export type Theme = 'dark' | 'light'

export default defineComponent({
  name: 'VCProvider',
  props: {
    prefixCls: {
      type: String as PropType<string>,
      default: 'vc'
    },
    theme: {
      type: String as PropType<Theme>,
      default: 'light'
    }
  },
  setup(props, { slots }) {
    const isMobile = ref<boolean>(false)
    const { prefixCls, theme } = toRefs(props)

    // Inject variables into the global
    createAppProviderContext({ prefixCls, isMobile, theme })
    return () => slots?.default?.()
  }
})
