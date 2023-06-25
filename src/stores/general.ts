import { defineStore } from "pinia";
import { Ref, ref, watch } from "vue";
import router from "@/router/router";

import Utils from "@/static/utils";
import { useSoloModeStore } from "./soloMode";
import { socket } from "@/socket";

export const useGeneralStore = defineStore('general', () => {
    // Create auto subscription to changes in order to save changes into the local storage
    useGeneralStore().$subscribe((mutation, state) => {
        localStorage.setItem('wikichallenge-data', JSON.stringify(state));

        socket.emit('saveUserData', {
            accountScore: accountScore.value,
            gamePlayed: gamePlayed.value,
            avatarID: avatarID.value,
            sessionId: sessionId.value,
            name: playerName.value,
        });
    });

    // Retrive the user data from local store
    let data = JSON.parse(localStorage.getItem('wikichallenge-data') || '{}');

    /* Session infos */
    const lastPath = ref(data.lastPath || "");

    const session = ref(data.session || Date.now());
    watch(lastPath, () => {
        session.value = Date.now();
    });

    /* Loading and error display */

    const loading = ref(false);
    const showLoginError = ref(false);
    const showPasswordError = ref(false);
    const showUnavailableName = ref(false);

    /* Maximum time between session to propose a sesion restore */
    const minimumToRestore = ref(data.minimumToRestore || false);
    const proposeRestore = ref((Date.now() - session.value < 1000 * 60 * 10 && minimumToRestore.value ? true : false)); // 10 minutes

    /* Server connectivity */
    const internetAvailable: Ref<boolean> = ref(true);

    window.addEventListener('online', () => {
        internetAvailable.value = true;
    });

    window.addEventListener('offline', () => {
        internetAvailable.value = false;
    });

    /* Account */

    const loggedIn = ref(data.loggedIn || false);
    const sessionId = ref(data.sessionId || "");

    const joinDate = ref(data.joinDate || 0);
    const accountScore = ref(data.accountScore || 0);
    const gamePlayed = ref(data.gamePlayed || 0);

    /* Player infos */
    const avatarCount = ref(7);
    const avatarID = ref(Utils.randomInt(1, 7));

    if(loggedIn.value == true) avatarID.value = data.avatarID;

    const playerName = ref("");
    if(loggedIn.value == true) playerName.value = data.playerName;

    /* Today stats */

    let date = new Date();
    const todayStats = ref({
        date: date.getDate(),
        month: date.getMonth(),

        gamePlayed: 0,
        score: 0,
    });

    if(data.todayStats && date.getDate() == data.todayStats.date && date.getMonth() == data.todayStats.month) {
        todayStats.value = data.todayStats;
    }

    /* Home page state */
    const homeFormStep = ref(1);
    
    /* General state */
    const hamburgerChecked = ref(false);

    /* Responsive */
    const showMobile = ref(isUserMobile());

    function isUserMobile() {
        if(document.documentElement.clientWidth < 850) return true;
        return false;
    }

    window.addEventListener('resize', () => {
        showMobile.value = isUserMobile();
    });

    /* Reset and restore */

    function restore() {
        minimumToRestore.value = true;
        proposeRestore.value = false;

        avatarID.value = data.avatarID;
        playerName.value = data.playerName;

        router.replace({ path: lastPath.value });
    }

    function reset() {
        session.value = Date.now();

        minimumToRestore.value = false;
        proposeRestore.value = false;
        lastPath.value = "/";

        useSoloModeStore().reset();

        router.replace('/');
    }

    /* Account data */

    function loadAccountData(data: any) {
        console.log(data)

        accountScore.value = data.score;
        avatarID.value = data.avatarid;
        gamePlayed.value = data.gameplayed;
        joinDate.value = data.joindate;
        playerName.value = data.name;
    }

    function logout() {
        loggedIn.value = false;
        sessionId.value = "";

        playerName.value = "";
        accountScore.value = 0;
        gamePlayed.value = 0;
        joinDate.value = 0;
        todayStats.value = {
            date: 0,
            month: 0,

            gamePlayed: 0,
            score: 0,
        };

        reset();
    }

    return {
        session,

        loading,
        showLoginError,
        showPasswordError,
        showUnavailableName,

        minimumToRestore,
        proposeRestore,
        lastPath,

        internetAvailable,

        loggedIn,
        sessionId,

        joinDate,
        accountScore,
        gamePlayed,

        avatarCount,
        avatarID,

        playerName,

        todayStats,

        homeFormStep,

        hamburgerChecked,
        
        showMobile,

        reset,
        restore,

        loadAccountData,
        logout,
    }
});