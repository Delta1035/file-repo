const app = Vue.createApp({})
import useComponent from './components.js';
useComponent(app);//注册组件
import useRouter from './router.js';
useRouter(app);//注册路由
app.mount('#app')
