import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import Func from './lib/func'
import Tools from './lib/tools'
import * as echarts from 'echarts'
import route from './router'
import signalr from './lib/signalr'

var app = createApp(App)
app.use(Func)
app.use(Tools)
app.use(ElementPlus)
app.use(route)
app.use(signalr)
app.config.globalProperties.$echarts = echarts
app.mount('#app')
