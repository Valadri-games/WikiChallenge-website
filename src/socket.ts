import { reactive, ref } from "vue";
import { io } from "socket.io-client";
import { useGeneralStore } from "./stores/general";

let serverUrl = "https://wikiserver.valentin-lelievre.com";
if(window.location.hostname == "localhost" || window.location.hostname.includes('192.168')) {
    serverUrl = "http://192.168.1.30:5000"; // Use dev version
}

export const socketState = reactive({
    connected: false,

    featuresEnabled: {
        login: true,
        signin: true,
        account: true,
        dailyChallenge: true,
        dailyChallengeLeaderboard: true,
    },
});

export const socketConnected = ref(false);

export const socket = io(serverUrl);

socket.on("connect", () => {
    socketState.connected = true;
    socketConnected.value = true;

    let generalStore = useGeneralStore();
    if(generalStore.loggedIn) {
        socket.emit('sessionlogin', {
            name: generalStore.playerName,
            sessionId: generalStore.sessionId,
        });
    }
});

socket.on("disconnect", () => {
    socketState.connected = false;
    socketConnected.value = false;
});

socket.on("featuresEnabled", (data) => {
    socketState.featuresEnabled = data;
});

socket.on("sessionlogin", (data) => {
    socket.off('sessionlogin');

    let generalStore = useGeneralStore();
    if(!data.succes) return generalStore.logout();

    generalStore.loadAccountData(data.data);
});