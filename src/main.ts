import { createApp } from "vue";
import { createPinia } from "pinia";

import router from "./router/router";
import App from "./App.vue";

import { socket } from "@/socket";

import "./assets/css/main.css";

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.mount("#app");

socket.connect();