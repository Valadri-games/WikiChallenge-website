import { reactive } from "vue";
import { io } from "socket.io-client";
import { useGeneralStore } from "./stores/general";

const serverUrl = "localhost:5000"; // "https://wikiserver.valentin-lelievre.com"

export const state = reactive({
    connected: false,
});

export const socket = io(serverUrl);

socket.on("connect", () => {
    state.connected = true;

    let generalStore = useGeneralStore();
    if(generalStore.loggedIn) {
        socket.emit('sessionlogin', {
            name: generalStore.playerName,
            sessionId: generalStore.sessionId,
        });
    }
});

socket.on("sessionlogin", (data) => {
    socket.off('sessionlogin');

    let generalStore = useGeneralStore();
    if(!data.succes) {
        generalStore.logout();
        return false;
    }

    generalStore.loadAccountData(data.data);
});