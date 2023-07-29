import { About } from "../pages/about.js";
import { Home } from "../pages/home.js";
import { Websocket } from "../pages/websocket/websocket.js";
const routes = [
    { path: '/', component: new Home },
    { path: '/about', component: new About },
    { path: '/websocket', component: new Websocket },
]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})
export default function useRouter(app){
    app.use(router)
}