import { reactive, ref } from "vue";
import { io } from "socket.io-client";
import { useAccountStore } from "./stores/account";

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

    let accountStore = useAccountStore();
    if(accountStore.loggedIn) {
        socket.emit('sessionlogin', {
            name: accountStore.name,
            sessionid: accountStore.sessionid,
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

    let accountStore = useAccountStore();
    if(!data.succes) return accountStore.logout();

    accountStore.loadAccountData(data.data);
});