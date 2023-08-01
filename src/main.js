import './assets/main.css'
import '../node_modules/maz-ui/css/main.css'
import '../node_modules/maz-ui/css/aos.css'

import { createApp } from 'vue'
import App from './App.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

const app= createApp(App)

app.provide('mazIconPath', 'src/assets/icons')
app.use(autoAnimatePlugin)
app.mount('#app')

