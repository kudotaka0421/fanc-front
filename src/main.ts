import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import { setupPinia } from "./store";

createApp(App).use(router).use(setupPinia()).mount("#app");
