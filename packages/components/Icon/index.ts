import vcIcon from './VCIcon.vue';
import vcSvgIcon from './VCSvgIcon.vue';
import {withInstall} from "@/utils";
import type { Plugin } from 'vue'

const VCIcon = withInstall(vcIcon) as typeof vcIcon & Plugin
const VCSvgIcon = withInstall(vcSvgIcon) as typeof vcSvgIcon & Plugin

export { VCIcon, VCSvgIcon };

export default VCIcon
