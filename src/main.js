import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
//引入国际化
import i18n from "./i18n";
import router from "./router";
import installElementPlus from "./plugins/element";
import installIcons from "@/icons";

//初始化样式表
import "./permission";
import "./styles/index.scss";
//全局属性
import installFilter from "@/filters";
//指令
import installDirective from "@/directives";
const app = createApp(App);
installIcons(app);
installFilter(app);
installDirective(app);
app.use(store).use(i18n).use(router).use(installElementPlus).mount("#app");
