import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import { setupPinia } from "./store";
import VCalendar from "v-calendar";
import "v-calendar/style.css";

const app = createApp(App);

app.use(router).use(setupPinia()).use(VCalendar).mount("#app");
