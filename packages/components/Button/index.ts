import vcButton from './VCButton.vue'
import { withInstall } from '@/utils'
import { Plugin } from 'vue'

const VCButton = withInstall(vcButton) as typeof vcButton & Plugin

export default VCButton

export { VCButton }

export * from './typing'
