<template>
    <!-- Connectivity pop up infos start -->
    <transition name="pop-up">
        <div v-if=showInternetPopup v-bind:class="{ 'bg-red-500': !goodState}" class="bg-green-500 color-900 absolute w-full p-3 text-center duration-300 z-50">
            <Text> {{ popupText }} </Text>
        </div>
    </transition>
    <!-- Connectivity pop up infos start -->

    <!-- Page viewer start -->
    <router-view v-slot="{ Component, route }">
        <transition :name=route.meta.useTransition>
            <component class="absolute w-full h-full overflow-x-hidden" :is=Component />
        </transition>
    </router-view>
    <!-- Page viewer end -->
</template>

<script setup lang="ts">
    import { RouterView } from "vue-router";
    import { storeToRefs } from "pinia";
    import { ref, watch } from "vue";

    import { socketConnected } from "./socket";

    import { useGeneralStore } from "./stores/general";

    import Text from '@/ui/text/Text.vue';

    // Init the general store
    const { internetAvailable } = storeToRefs(useGeneralStore());

    // Defined wether or not the wifi popup info is displayed
    const showInternetPopup = ref(false);
    const popupText = ref('');
    const goodState = ref(true);

    let timer: number | null = null;

    // Run function when internetStatus changes
    setTimeout(() => {
        watch([internetAvailable, socketConnected], () => {
            showInternetPopup.value = true;

            setPopUpText();

            if(timer) clearTimeout(timer);
            timer = setTimeout(() => {
                showInternetPopup.value = false;
            }, 5000);
        });
    }, 500);

    function setPopUpText() {
        if(!socketConnected.value || !internetAvailable.value) {
            if(!internetAvailable.value) popupText.value = "Auncune connection à internet";
            else if(!socketConnected.value) popupText.value = "Serveurs actuellement indisponible";

            goodState.value = false;
        } else {
            popupText.value = "Connection rétablie";
            goodState.value = true;
        }
    }

    if(window.location.hostname != "localhost" && !window.location.hostname.includes('192.168')) {
        let analiticsScript = document.createElement('script');
        analiticsScript.setAttribute('src', 'https://wikistats.valentinllv.cloud/script.js');
        analiticsScript.dataset.websiteId = "32419877-8f06-45bd-878e-5facbbd6d5da";
        
        document.head.appendChild(analiticsScript);
    }
</script>

<style scoped>
    .pop-up-enter-active, .pop-up-leave-active { transition: 0.3s; }
    .pop-up-enter-from, .pop-up-leave-to { top: -150px; }
    .pop-up-enter-to, .pop-up-leave-from { top: 0px; }
</style>