import { VCIcon, VCSvgIcon } from './Icon'
import VCButton from './Button'
import VCProvider from './Provider'
import VCLoading from './Loading'
import { App } from 'vue'
import { VCBasicArrow } from './Basic'

const components = [VCIcon, VCSvgIcon, VCButton, VCProvider, VCLoading, VCBasicArrow]

function install(app: App) {
  components.forEach((com) => {
    app.component(com.name, com)
  })
}

export default {
  install
}

export { install, VCIcon, VCSvgIcon, VCButton, VCProvider, VCLoading, VCBasicArrow }
