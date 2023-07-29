import { About } from "../pages/about.js";
import { Home } from "../pages/home.js";
import { Websocket } from "../pages/websocket/websocket.js";
export default function useComponent(app){
    app.component('about',new About);
    app.component('home',new Home);
    app.component('websocket',new Websocket);
}