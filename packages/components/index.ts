import { VCIcon, VCSvgIcon } from './Icon'
import VCButton from './Button'
import VCProvider from './Provider'
import VCLoading from './Loading'
import { App } from 'vue'
import { VCBasicArrow } from './Basic'
import VCBasicForm from './Form'

const components = [VCIcon, VCSvgIcon, VCButton, VCProvider, VCLoading, VCBasicArrow, VCBasicForm]

function install(app: App) {
  components.forEach((com) => {
    app.component(com.name, com)
  })
}

export default {
  install
}

export { install, VCIcon, VCSvgIcon, VCButton, VCProvider, VCLoading, VCBasicArrow, VCBasicForm }
