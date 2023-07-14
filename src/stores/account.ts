import router from "@/router/router";
import { socket } from "@/socket";
import Utils from "@/static/utils";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAccountStore = defineStore('account', () => {
    // Create auto subscription to changes in order to save changes into the local storage
    useAccountStore().$subscribe((mutation, state) => {
        localStorage.setItem('account', JSON.stringify(state));

        if(socket.connected && loggedIn.value == true) {
            socket.emit('saveUserData', {
                avatarid: avatarid.value,
                name: name.value,

                dailychallengeplayed: dailychallengeplayed.value,
                easygame: easygame.value,
                mediumgame: mediumgame.value,
                hardgame: hardgame.value,
                randompagegame: randompagegame.value,

                gameplayed: gameplayed.value,
                score: score.value,
                pagesseen: pagesseen.value,

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

    const avatarid = ref(data.avatarid || Utils.randomInt(1, 7));
    const name = ref(data.name || "");

    const joinDate = ref(data.joinDate || 0);

    const dailychallengeplayed = ref(data.dailychallengeplayed || 0);
    const easygame = ref(data.easygame || 0);
    const mediumgame = ref(data.mediumgame || 0);
    const hardgame = ref(data.hardgame || 0);
    const randompagegame = ref(data.randompagegame || 0);

    const gameplayed = ref(data.gameplayed || 0);
    const score = ref(data.score || 0);
    const pagesseen = ref(data.pagesseen || 0);
    const daylichallengepodium = ref(data.daylichallengepodium || 0);

    const streakdays = ref(data.streakdays || 1);
    const lastlogin = ref(data.lastlogin || Date.now());

    const todaygamecount = ref(data.todaygamecount || 0);
    const todayscorecount = ref(data.todayscorecount || 0);

    const dailychallengedone = ref(data.dailychallengedone || false);
    const dailychallengescore = ref(data.dailychallengescore || 0);

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
        score.value = accountData.score;
        pagesseen.value = accountData.pagesseen;
        daylichallengepodium.value = accountData.daylichallengepodium;

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
        score.value = 0;
        pagesseen.value = 0;
        daylichallengepodium.value = 0;

        streakdays.value = 0;
        lastlogin.value = 0;
        
        todaygamecount.value = 0;
        todayscorecount.value = 0;

        dailychallengedone.value = false;
        dailychallengescore.value = 0;
    }

    function logout() {
        reset();
        router.push('/');
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
        score,
        pagesseen,
        daylichallengepodium,

        streakdays,
        lastlogin,

        todaygamecount,
        todayscorecount,

        dailychallengedone,
        dailychallengescore,

        loadAccountData,
        reset,
        logout,
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