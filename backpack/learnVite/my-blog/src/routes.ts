import { RouteRecordRaw } from "vue-router";
import Home from './pages/home.vue'
import All from './pages/all.vue'
import Active from './pages/active.vue'
import Completed from './pages/completed.vue'
// const Home = () => import("./pages/home.vue");
// const All = () => import("./pages/all.vue");
// const Active = () => import("./pages/active.vue");
// const Completed = () => import("./pages/completed.vue");
const routes: Array<RouteRecordRaw> = [
  { path: "/", component: Home },
  { path: "/all", component: All },
  { path: "/active", component: Active },
  { path: "/completed", component: Completed },
];

export default routes;
