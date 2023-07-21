import { socket } from "@/socket";
import Utils from "@/static/utils";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useGeneralStore } from "./general";

export const useAccountStore = defineStore('account', () => {
    // Create auto subscription to changes in order to save changes into the local storage
    useAccountStore().$subscribe((mutation, state) => {
        localStorage.setItem('account', JSON.stringify({
            loggedIn: loggedIn.value,
            sessionid: sessionid.value,

            avatarid: avatarid.value,
            name: name.value,
        }));

        if(socket.connected && loggedIn.value == true) {
            socket.emit('saveUserData', {
                avatarid: avatarid.value,
                sessionid: sessionid.value,
            });
        }
    });

    // Retrive the user data from local store
    let data = JSON.parse(localStorage.getItem('account') || '{}');

    // User data

    const loggedIn = ref(data.loggedIn || false);
    const sessionid = ref(data.sessionid || "");
    const freshDataLoaded = ref(false);

    if(!useGeneralStore().proposeRestore) data.avatarid = undefined;
    const avatarid = ref(data.avatarid || Utils.randomInt(1, 7));
    const name = ref(data.name || "");

    const joinDate = ref(0);

    const dailychallengeplayed = ref(0);
    const easygame = ref(0);
    const mediumgame = ref(0);
    const hardgame = ref( 0);
    const randompagegame = ref(0);

    const gameplayed = ref(0);
    const pagesseen = ref(0);
    const daylichallengepodium = ref(0);

    const score = ref(0);
    const scoreMultiplier = ref(1);

    const streakdays = ref(1);
    const lastlogin = ref(Date.now());

    const todaygamecount = ref(0);
    const todayscorecount = ref(0);

    const dailychallengedone = ref(false);
    const dailychallengescore = ref(0);

    function loadAccountData(accountData: AccountData) {
        freshDataLoaded.value = true;

        avatarid.value = accountData.avatarid;
        name.value = accountData.name;

        joinDate.value = accountData.joindate;

        dailychallengeplayed.value = accountData.dailychallengeplayed;
        easygame.value = accountData.easygame;
        mediumgame.value = accountData.mediumgame;
        hardgame.value = accountData.hardgame;
        randompagegame.value = accountData.randompagegame;

        gameplayed.value = accountData.gameplayed;
        pagesseen.value = accountData.pagesseen;
        daylichallengepodium.value = accountData.daylichallengepodium;

        score.value = accountData.score;
        scoreMultiplier.value = 1 + (streakdays.value / 30 >= 2 ? 2 : Math.trunc(streakdays.value / 3) / 10);

        streakdays.value = accountData.streakdays;
        lastlogin.value = accountData.lastlogin;
        
        todaygamecount.value = accountData.todaygamecount;
        todayscorecount.value = accountData.todayscorecount;

        dailychallengedone.value = accountData.dailychallengedone;
        dailychallengescore.value = accountData.dailychallengescore;
    }

    function reset() {
        loggedIn.value = false;
        sessionid.value = 0;
        freshDataLoaded.value = false;

        avatarid.value = Utils.randomInt(1, 7);
        name.value = "";

        joinDate.value = 0;

        dailychallengeplayed.value = 0;
        easygame.value = 0;
        mediumgame.value = 0;
        hardgame.value = 0;
        randompagegame.value = 0;

        gameplayed.value = 0;
        pagesseen.value = 0;
        daylichallengepodium.value = 0;

        score.value = 0;
        scoreMultiplier.value = 1;

        streakdays.value = 0;
        lastlogin.value = 0;
        
        todaygamecount.value = 0;
        todayscorecount.value = 0;

        dailychallengedone.value = false;
        dailychallengescore.value = 0;
    }

    return {
        loggedIn,
        sessionid,
        freshDataLoaded,

        avatarid,
        name,

        joinDate,

        dailychallengeplayed,
        easygame,
        mediumgame,
        hardgame,
        randompagegame,

        gameplayed,
        pagesseen,
        daylichallengepodium,

        score,
        scoreMultiplier,

        streakdays,
        lastlogin,

        todaygamecount,
        todayscorecount,

        dailychallengedone,
        dailychallengescore,

        loadAccountData,
        reset,
    }
});

interface AccountData {
    avatarid: number,
    name: string,

    joindate: number,

    dailychallengeplayed: number,
    easygame: number,
    mediumgame: number,
    hardgame: number,
    randompagegame: number,

    gameplayed: number,
    score: number,
    pagesseen: number,
    daylichallengepodium: number,

    streakdays: number,
    lastlogin: number,

    todaygamecount: number,
    todayscorecount: number,

    dailychallengedone: boolean,
    dailychallengescore: number,
}