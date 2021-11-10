import vcButton from './VCButton.vue'
import popConfirmButton from './PopConfirmButton.vue'
import { withInstall } from '@/utils'
import { Plugin } from 'vue'

const VCButton = withInstall(vcButton) as typeof vcButton & Plugin
const PopConfirmButton = withInstall(popConfirmButton) as typeof popConfirmButton & Plugin

export default VCButton

export { VCButton, PopConfirmButton }

export * from './typing'
