import { defineStore } from "pinia";
import { Ref, ref, watch } from "vue";
import router from "@/router/router";

import Utils from "@/static/utils";
import { useSoloModeStore } from "./soloMode";

export const useGeneralStore = defineStore('general', () => {
    // Create auto subscription to changes in order to save changes into the local storage
    useGeneralStore().$subscribe((mutation, state) => {
        localStorage.setItem('wikichallenge-data', JSON.stringify(state));
    });

    // Retrive the user data from local store
    let data = JSON.parse(localStorage.getItem('wikichallenge-data') || '{}');

    /* Session infos */
    const lastPath = ref(data.lastPath || "");

    const session = ref(data.session || Date.now());
    watch(lastPath, () => {
        session.value = Date.now();
    });

    const loading = ref(false);

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

    /* Player infos */
    const avatarCount = ref(7);
    const avatarID = ref(Utils.randomInt(1, 7));

    const playerName = ref("");

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

    return {
        session,

        loading,

        minimumToRestore,
        proposeRestore,
        lastPath,

        internetAvailable,

        avatarCount,
        avatarID,

        playerName,

        homeFormStep,

        hamburgerChecked,
        
        showMobile,

        reset,
        restore,
    }
});