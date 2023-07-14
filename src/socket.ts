import { ref } from "vue";
import { io } from "socket.io-client";
import { useAccountStore } from "./stores/account";
import { useGeneralStore } from "./stores/general";

// const accountStore = useAccountStore();

let serverUrl = "https://wikiserver.valentin-lelievre.com";
if(window.location.hostname == "localhost" || window.location.hostname.includes('192.168')) {
    serverUrl = "http://192.168.1.30:5000"; // Use dev version
}

export const socket = io(serverUrl);
export const socketConnected = ref(false);

export const featuresEnabled = ref({
    login: true,
    signin: true,
    account: true,
    dailyChallenge: true,
    dailyChallengeLeaderboard: true,
});

let sessionLoginTimeout: any;
export function socketInit() {
    socket.connect();

    let accountStore = useAccountStore();
    if(accountStore.loggedIn) {
        // If the session login respond takes too long then delete local account data and display an error warning
        sessionLoginTimeout = setTimeout(() => {
            useGeneralStore().showDownloadUserDataError = true;
            accountStore.logout();

            socket.off('sessionlogin');
        }, 5000);
    }
}

socket.on("connect", () => {
    socketConnected.value = true;

    // If local data indicates that user was connected, then perform a validation of the user session
    let accountStore = useAccountStore();
    if(accountStore.loggedIn) {
        socket.emit('sessionlogin', {
            name: accountStore.name,
            sessionid: accountStore.sessionid,
        });
    }
});

socket.on("disconnect", () => {
    socketConnected.value = false;
});

socket.on("featuresEnabled", (data) => {
    featuresEnabled.value = data;
});

// Session login respond, if session is valid then load the fresh new account data otherwise delete local account data
socket.on("sessionlogin", (data) => {
    let accountStore = useAccountStore();

    socket.off('sessionlogin');
    clearTimeout(sessionLoginTimeout);

    if(!data.succes) {
        useGeneralStore().showDownloadUserDataError = true;
        return accountStore.logout();
    }

    accountStore.loadAccountData(data.data);
});