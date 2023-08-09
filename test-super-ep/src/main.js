import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/main.scss";

import change from "@directives/change";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(ElementPlus);

/* 注册全局自定义指令 */
app.directive(change.name, change);

/* 将@steveouyang/super-ep组件库作为插件安装 */
import SuperEpPlugin from "@steveouyang/super-ep"
app.use(SuperEpPlugin)

app.mount("#app");
