import Utils from "@/static/utils";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { useAccountStore } from "./account";
import { socket } from "@/socket";

export const useSoloModeStore = defineStore('soloMode', () => {
    // Create auto subscription to changes in order to save changes into the local storage
    useSoloModeStore().$subscribe((mutation, state) => {
        localStorage.setItem('solo-mode', JSON.stringify(state));
    });

    // Retrive the user data from local store
    let data = JSON.parse(localStorage.getItem('solo-mode') || '{}');

    /* Server error */
    const showError = ref(false);

    /* Game mode */
    const gameMode = ref(data.gameMode || 1);
    const dailyChallengeDifficulty = ref(data.dailyChallengeDifficulty || 1);

    /* Game path */
    const startPage = ref(data.startPage || "");
    const endPage = ref(data.endPage || "");
    const currentPage = ref(data.currentPage || "");

    const endPageSummary = ref(data.endPageSummary || "");

    /* Game stats */

    const gameStarted = ref(data.gameStarted || false);
    const gameEnded = ref(data.gameEnded || false);

    const gameStartDate = ref(data.gameStartDate || 0);
    const gameTimerPauses: Ref<Array<number>> = ref(data.gameTimerPauses ||[]);

    const pagesPath = ref(data.pagesPath || []);
    const steps = ref(data.steps || 0);

    const totalTime = ref(data.totalTime || 0);
    const score = ref(data.score || 0);
    const scoreMultiplied = ref(data.scoreMultiplied || 0);

    function win() {
        let accountStore = useAccountStore();

        totalTime.value = Utils.calcGameTime(gameTimerPauses.value);
        score.value = Math.trunc((1 / steps.value) * 1500) + Math.trunc((1 / (totalTime.value / 10000)) * 1500);

        if(gameMode.value == 2) score.value *= 1.5;
        if(gameMode.value == 3) score.value *= 2;

        if([1, 2, 3, 4].includes(gameMode.value)) scoreMultiplied.value = Math.trunc(score.value * accountStore.scoreMultiplier);
        else scoreMultiplied.value = score.value;

        if(accountStore.loggedIn) {
            accountStore.score += scoreMultiplied.value;
            accountStore.gameplayed += 1;
            accountStore.pagesseen += steps.value + 1;

            if(gameMode.value == 1) accountStore.easygame += 1;
            else if(gameMode.value == 2) accountStore.mediumgame += 1;
            else if(gameMode.value == 3) accountStore.hardgame += 1;
            else if(gameMode.value == 4) accountStore.randompagegame += 1;
            else if(gameMode.value == 5) accountStore.dailychallengeplayed += 1;

            accountStore.todaygamecount += 1;
            accountStore.todayscorecount += scoreMultiplied.value;

            if(gameMode.value == 5) {
                accountStore.dailychallengedone = true;
                accountStore.dailychallengescore = scoreMultiplied.value;
            }

            socket.emit("registergame", {
                sessionid: accountStore.sessionid,
                pagefrom: startPage.value,
                pageto: endPage.value,
                gamemode: gameMode.value,
                score: scoreMultiplied.value,
                totaltime: totalTime.value,
                date: Date.now(),
                pathlength: steps.value,
            });
        }
    }

    function reset() {
        gameMode.value = 1;
        dailyChallengeDifficulty.value = 1;

        startPage.value = "";
        endPage.value = "";
        currentPage.value = "";

        endPageSummary.value = "";

        gameStarted.value = false;
        gameEnded.value = false;

        gameStartDate.value = 0;
        gameTimerPauses.value = [];

        pagesPath.value = [];
        steps.value = 0;

        totalTime.value = 0;
        score.value = 0;
        scoreMultiplied.value = 0;
    }

    return {
        showError,
        
        gameMode,
        dailyChallengeDifficulty,

        startPage,
        endPage,
        currentPage,

        endPageSummary,

        gameStarted,
        gameEnded,

        gameStartDate,
        gameTimerPauses,
        
        pagesPath,
        steps,

        totalTime,
        score,
        scoreMultiplied,

        win,
        reset,
    }
});