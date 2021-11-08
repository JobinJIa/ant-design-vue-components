import vcProvider from './VCProvider';
import {withInstall} from "@/utils";
import { Plugin } from "vue";


const VCProvider = withInstall(vcProvider) as typeof vcProvider & Plugin

export default VCProvider
