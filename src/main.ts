import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "virtual:svg-icons-register";

import allGlobalComponent from "./components/GlobalComponent/index";

const app = createApp(App);

app.use(allGlobalComponent);
app.use(ElementPlus);

app.mount("#app");
