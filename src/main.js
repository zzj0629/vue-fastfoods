import{createApp}from'vue'
import App from'./App.vue'
import router from'./router'
import ElementPlus from'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import'element-plus/dist/index.css'
import VueCookies from'vue-cookies'
import md5 from 'js-md5'

const app=createApp(App)
app.use(ElementPlus,{ locale: zhCn, })
app.use(VueCookies)
app.use(router).mount('#app')
