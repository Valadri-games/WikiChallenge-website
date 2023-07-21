<template>
    <div class="absolute w-full h-full overflow-hidden flex flex-col pt-20 duration-300">
        <div class="absolute top-0 left-0 w-full bg-accent2 h-20 flex flex-col duration-300 overflow-hidden scale-x-105 rounded-b-3xl border-b-4 border-l-4 border-r-4 border-100 z-40" :class="{ 'h-40': menuOpen }">
            <div class="flex flex-row items-center pt-3">
                <div class="pl-4 pr-4">
                    <img src="@/assets/icons/target.svg" />
                </div>

                <div class="flex-1 flex overflow-hidden">
                    <Text class="whitespace-nowrap overflow-hidden text-ellipsis" @click="showEndSummary = true"> {{ endPage.replaceAll("_", " ") }} </Text>
                </div>

                <div @click="showEndSummary = true" class="ml-4 h-12 w-12 text-center flex flex-col justify-center items-center border-3 border-100 rounded-xl">
                    <Text class=" !font-bold !text-3xl"> ? </Text>
                </div>

                <div class="pl-4 pr-4" @click="menuOpen = !menuOpen">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 8L16 24" stroke="#62506D" stroke-width="3" stroke-linecap="round" class="duration-300 origin-center" :class="{ 'rotate-90': menuOpen }"/>
                        <path d="M8 16H24" stroke="#62506D" stroke-width="3" stroke-linecap="round" />
                        <rect x="1.5" y="1.5" width="29" height="29" rx="5.5" stroke="#62506D" stroke-width="3"/>
                    </svg>
                </div>
            </div>

            <div class="flex flex-row items-center pt-4">
                <div class="pl-4 pr-4" @click="showModalQuit = true">
                    <img src="@/assets/icons/quit.svg" />
                </div>

                <div class="flex-1 flex flex-col whitespace-nowrap overflow-hidden items-center justify-center">
                    <Text class="!font-bold"> TEMPS </Text>
                    <Text class="!font-bold"> {{ Utils.convertMsToTime(currentDate - gameStartDate) }} </Text>
                </div>

                <div class="flex-1 flex flex-col whitespace-nowrap overflow-hidden items-center justify-center">
                    <Text class="!font-bold"> CLICS </Text>
                    <Text class="!font-bold"> {{ steps }} </Text>
                </div>

                <div class="pl-4 pr-4" @click="startPause">
                    <img :class="{ 'hidden': showModalPause }" src="@/assets/icons/pause.svg" />
                    <img :class="{ 'hidden': !showModalPause }" src="@/assets/icons/play.svg" />
                </div>
            </div>
        </div>

        <Transition name="fade">
            <div @click="router.push('/solo/win')" v-if="gameEnded" class="absolute top-0 left-full -translate-x-full w-full pl-6 pr-6 mt-24 z-40 duration-300" :class="{ 'mt-44': menuOpen }">
                <div class="flex flex-row gap-4 bg-accent2 rounded-3xl p-4 justify-center items-center border-4 border-100">
                    <div class="ml-4">
                        <img src="@/assets/icons/flag.svg" />
                    </div>

                    <div class="flex-1">
                        <Text class="text-center !font-bold"> Vous avez gagné ! </Text>
                        <SmallHeader class="text-center mt-4 opacity-80"> Cliquez ici pour continuer </SmallHeader>
                    </div>
                </div>
            </div>
        </Transition>

        <Text class="w-full text-center mt-3 mb-3"> {{ currentPage }} </Text>

        <div class="flex-1 flex-col overflow-hidden w-full">
            <WikiView @loaded="viewLoaded" @loading="viewLoading" @win="win" @pageNotFound="showErrorModal = true" :class="{ 'hidden': loading }" />

            <div class="w-full h-full pl-10 pr-10 flex flex-col justify-center" v-if="loading && gameStarted">
                <Header class="w-full text-center"> Chargement&nbsp;... </Header>

                <Text class="mt-10"> Ce temps de ne sera pas compté dans la durée final de votre partie. </Text>
            </div>
        </div>

        <Teleport to="body">
            <ModalPause :show="showModalPause" @close="endPause"></ModalPause>
        </Teleport>

        <Teleport to="body">
            <ModalQuit :dailychallenge="gameMode == 5 ? true : false" :show="showModalQuit" @close="showModalQuit = false" @quit="quitGame"></ModalQuit>
        </Teleport>

        <Teleport to="body">
            <ModalStart :show="showModalStart" :loading="loading" @close="showModalStart = false"></ModalStart>
        </Teleport>

        <Teleport to="body">
            <ModalBigText :button="'Fermer'" :title="endPage.replaceAll('_', ' ')" :show="showEndSummary" @close="showEndSummary = false">
                {{ endPageSummary }}
            </ModalBigText>
        </Teleport>

        <Teleport to="body">
            <ModalTextContent :button="'Reprendre'" :title="'Page indisponible'" :show="showErrorModal" @close="showErrorModal = false">
                La page a laquelle vous tentez d'acceder n'existe plus ou est une page interdite.
            </ModalTextContent>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import router from '@/router/router';

    import { useSoloModeStore } from '@/stores/soloMode';

    import Utils from '@/static/utils';

    import WikiView from '@/components/wiki/WikiView.vue';

    import ModalPause from '@/components/popup/GamePause.vue';
    import ModalQuit from '@/components/popup/ModalQuit.vue';

    import ModalStart from './ModalStart.vue';
    import ModalTextContent from '@/components/popup/BasicTextContent.vue';
    import ModalBigText from '@/components/popup/BasicBigContent.vue';

    import Text from '@/ui/text/Text.vue';
    import Header from '@/ui/text/Header.vue';
    import SmallHeader from '@/ui/text/SmallHeader.vue';

    const { endPage, gameStarted, gameEnded, gameStartDate, gameTimerPauses, pagesPath, currentPage, steps, endPageSummary, gameMode } = storeToRefs(useSoloModeStore());

    const menuOpen = ref(false);

    const showModalPause = ref(false);
    const showModalQuit = ref(false);
    const showEndSummary = ref(false);

    const showModalStart = ref(false);
    const showErrorModal = ref(false);

    const loading = ref(true);
    const currentDate = ref(Date.now());

    function viewLoaded() {
        loading.value = false;

        if(gameStarted.value == false && gameEnded.value == false) {
            setTimeout(() => {
                showModalStart.value = false;
                gameStarted.value = true;
            }, 1500);
        } else if(gameEnded.value == false) showModalStart.value = false;
    }

    function viewLoading() {
        loading.value = true;

        if(gameStarted.value == false && gameEnded.value == false) {
            showModalStart.value = true;
        }
    }

    function startPause() {
        if(showModalPause.value == false) {
            showModalPause.value = true;
            
            if(gameEnded.value == false) {
                gameTimerPauses.value.push(Date.now());
                pagesPath.value.push(currentPage.value);
            }
        }
    }

    function endPause() {
        if(showModalPause.value == true) {
            showModalPause.value = false;
            
            if(gameEnded.value == false) {
                gameTimerPauses.value.push(Date.now());
            }
        }
    }

    function quitGame() {
        // Save today participation to daily challenge
        router.push('/solo');
    }

    function win() {
        showModalStart.value = false;
        loading.value = false;
    }
    
    currentDate.value = Date.now();
    setInterval(() => {
        if(gameEnded.value == false) {
            currentDate.value = Date.now();
        }
    }, 1000);

    window.addEventListener("beforeunload", () => {
        if(gameStarted.value == true) {
            gameTimerPauses.value.push(Date.now());
        }
    });
</script>