import { createPinia } from "pinia";
import { createApp } from "vue";
import { createRouter,createWebHistory } from "vue-router";
import App from "./App.vue";
import routes from "./routes";
const pinia = createPinia();
const app = createApp(App);
const router = createRouter({
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
});
app.use(pinia);
app.use(router);
app.mount("#app");
