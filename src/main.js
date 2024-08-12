import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './reset.css'
import routes from './routes.js'
import {createRouter, createWebHistory} from "vue-router";
import setTitle from './util/setTitle.js'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
const router = createRouter({
    history: createWebHistory(),
    routes,
})
router.afterEach((to, from) => {
    if (to.meta.title) {
        setTitle.routeTitle.value = to.meta.title
    }
})
app.use(ElementPlus)
    .use(router)
    .mount('#app')
