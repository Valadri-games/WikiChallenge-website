import Utils from "@/static/utils";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { useGeneralStore } from "./general";

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
    const steps = ref(0);

    const totalTime = ref(data.totalTime || 0);
    const score = ref(0);

    function win() {
        totalTime.value = Utils.calcGameTime(gameTimerPauses.value);
        score.value = Math.trunc((1 / steps.value) * 1500) + Math.trunc((1 / (totalTime.value / 1000)) * 1000);

        let generalStore = useGeneralStore();
        generalStore.accountScore += score.value;
        generalStore.gamePlayed += 1;

        generalStore.todayStats.gamePlayed += 1;
        generalStore.todayStats.score += score.value;;
    }

    function reset() {
        gameMode.value = 1;

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
    }

    return {
        showError,
        
        gameMode,

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

        win,
        reset,
    }
});