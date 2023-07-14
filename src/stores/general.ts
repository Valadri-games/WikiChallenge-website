import { defineStore } from "pinia";
import { Ref, ref, watch } from "vue";
import router from "@/router/router";

import { useSoloModeStore } from "./soloMode";
import Utils from "@/static/utils";

export const useGeneralStore = defineStore('general', () => {
    // Create auto subscription to changes in order to save changes into the local storage
    useGeneralStore().$subscribe((mutation, state) => {
        localStorage.setItem('general-data', JSON.stringify(state));
    });

    // Retrive the user data from local store
    let data = JSON.parse(localStorage.getItem('general-data') || '{}');

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
    const showDownloadUserDataError = ref(false);

    /* Maximum time between session to propose a sesion restore */
    const minimumToRestore = ref(data.minimumToRestore || false);
    const proposeRestore = ref((Date.now() - session.value < 1000 * 60 * 10 && minimumToRestore.value ? true : false)); // 10 minutes

    /* Server connectivity */
    const internetAvailable: Ref<boolean> = ref(true);

    window.addEventListener('online', () => { internetAvailable.value = true; });
    window.addEventListener('offline', () => { internetAvailable.value = false; });

    /* Avatar infos */
    const avatarCount = ref(7);

    /* Home page state */
    const homeFormStep = ref(1);
    
    /* General state */
    const hamburgerChecked = ref(false);

    /* Responsive */
    const showMobile = ref(Utils.isUserMobile());
    
    window.addEventListener('resize', () => { showMobile.value = Utils.isUserMobile(); });

    /* Reset and restore */
    function restore() {
        session.value = Date.now();
        
        minimumToRestore.value = true;
        proposeRestore.value = false;

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
        showLoginError,
        showPasswordError,
        showUnavailableName,
        showDownloadUserDataError,

        minimumToRestore,
        proposeRestore,
        lastPath,

        internetAvailable,

        avatarCount,

        homeFormStep,

        hamburgerChecked,
        
        showMobile,

        reset,
        restore,
    }
});