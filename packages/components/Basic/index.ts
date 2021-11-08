import vcBasicArrow from './VCBasicArrow.vue'
import vcBasicHelp from './VCBasicHelp.vue'
import { withInstall } from '@/utils'
import { Plugin } from 'vue'

const VCBasicArrow = withInstall(vcBasicArrow) as typeof vcBasicArrow & Plugin
const VCBasicHelp = withInstall(vcBasicHelp) as typeof vcBasicHelp & Plugin

export { VCBasicArrow, VCBasicHelp }
