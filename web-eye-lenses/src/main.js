import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './plugins/axios'
import './style.css'

const app = createApp(App)
app.config.globalProperties.$http = axios
app.use(router)
app.use(store)
app.mount('#app')
