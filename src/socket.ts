import { reactive } from "vue";
import { io } from "socket.io-client";

const serverUrl = "https://wikiserver.valentin-lelievre.com";

export const state = reactive({
    connected: false,
});

export const socket = io(serverUrl);

socket.on("connect", () => {
    state.connected = true;
});