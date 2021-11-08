import { createApp } from 'vue'
import App from './App.vue'
// import com from '@jiabinbin/vue3-library'
// import '@jiabinbin/vue3-library/dist/index.css'
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import com from '../packages/components'

const app = createApp(App)
app.use(antd)
app.use(com)
// app.use(VCButton)
// app.use(VCIcon)
app.mount('#app')
