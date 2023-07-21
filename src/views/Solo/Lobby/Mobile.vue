<template>
    <div class="absolute w-full h-full overflow-hidden flex flex-col">
        <div class="flex flex-row justify-center items-center ml-8 mr-8 mt-6 gap-20">
            <div class="min-w-fit" @click="router.go(-1);">
                <img class="h-10 w-10 cursor-pointer" src="@/assets/icons/back-arrow.svg" />
            </div>

            <LargeHeader v-if="gameMode != 5" class="text-center color-100"> Mode&nbsp;solo </LargeHeader>
            <LargeHeader v-if="gameMode == 5" class="text-center color-100"> Défi&nbsp;quotidien </LargeHeader>
            <img class="h-12 w-12" src="@/assets/icons/play-solo.svg" />
        </div>

        <div class="flex-1 flex flex-col justify-center mb-32 mt-5">
            <div>
                <div v-if="gameMode == 5" class="ml-5 mr-5 mb-4">
                    <Text v-if="!dailychallengedone"> Il te reste <span class="font-bold">{{ Utils.convertMsToDuration(Utils.getTimeToTomorrow()) }}</span> pour participer&nbsp;! </Text>
                    <Text v-if="dailychallengedone"> Tu as déjà participé aujourd'hui. Reviens demain pour un nouveau défi. </Text>
                </div>

                <div class="pl-6 pr-6">
                    <Text> Départ </Text>

                    <div class="relative w-full mt-1 pb-3">
                        <input type="text" placeholder="Page de départ" :value="startPage.replaceAll('_', ' ')" class="bg-900 color-100 w-full border-4 border-100 p-4 pl-6 pr-20 text-size rounded-full shadow text-ellipsis" spellcheck="false" autocomplete="false" />

                        <ButtonRounded v-if="gameMode != 5" @click="newStartPage" animation="scale" class="absolute top-1/2 -translate-y-1/2 -mt-[4.5px] left-full -ml-[54px] scale-[0.75]">
                            <img class="h-12 w-12" src="@/assets/icons/looped-arrow.svg" :class="{ 'animation-rotate': startPageLoading }" />
                        </ButtonRounded>
                    </div>
                </div>

                <div class="mt-3 pl-6 pr-6">
                    <Text> Arrivée </Text>

                    <div class="relative w-full mt-1 pb-3">
                        <input type="text" placeholder="Page d'arrivée" :value="endPage.replaceAll('_', ' ')" class="bg-900 color-100 w-full border-4 border-100 p-4 pl-6 pr-20 text-size rounded-full shadow text-ellipsis" spellcheck="false" autocomplete="false" />

                        <ButtonRounded v-if="gameMode != 5" @click="newEndPage" animation="scale" class="absolute top-1/2 -translate-y-1/2 -mt-[4.5px] left-full -ml-[54px] scale-[0.75]">
                            <img class="h-12 w-12" src="@/assets/icons/looped-arrow.svg" :class="{ 'animation-rotate': endPageLoading }" />
                        </ButtonRounded>

                        <div v-if="gameMode == 5" class="absolute top-1/2 -translate-y-1/2 -mt-[4.5px] left-full -ml-[92px] scale-90 border-3 border-100 bg-accent2 p-2 pl-4 pr-4 rounded-full w-fit h-fit">
                            <Text> {{ challengeDifficultyText }} </Text>
                        </div>
                    </div>
                </div>

                <div class="flex-1 flex flex-col w-full overflow-hidden mt-5">
                    <div class="bg-100 ml-6 mr-6 rounded-3xl flex flex-col overflow-hidden">
                        <Text class="ml-4 color-900 text-white mt-3"> Définition de la page finale </Text>

                        <div class="flex-1 flex flex-col border-4 border-100 p-4 rounded-3xl bg-900 overflow-hidden">
                            <Text class="flex-1 text !text-xl">
                                {{ endPageSummary }}
                            </Text>

                            <SmallHeader class="!text-2xl text-center mt-3 cursor-pointer" @click="showModal = true"> VOIR PLUS </SmallHeader>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="gameMode != 5" class="absolute top-full -translate-y-full left-1/2 -translate-x-1/2 pb-8" :class="{ 'pointer-events-none': startPageLoading || endPageLoading, 'opacity-50': startPageLoading || endPageLoading }">
            <ButtonClassic @click="router.replace('/solo/game')"> Jouer </ButtonClassic>
        </div>

        <div v-if="gameMode == 5" class="absolute left-0 top-full -translate-y-full w-full flex justify-center pb-8 gap-5">
            <ButtonClassic :secondOption="true" :small-pad="true" @click="Leaderboards.loadDailyChallengeLeaderboard"> Voir le classement </ButtonClassic>
            <ButtonClassic v-if="!dailychallengedone" :small-pad="true" @click="playDailyChallenge"> Jouer </ButtonClassic>
        </div>

        <Teleport to="body">
            <ModalBigText :button="'Fermer'" :title="endPage.replaceAll('_', ' ')" :show="showModal" @close="showModal = false">
                {{ endPageSummary }}
            </ModalBigText>
        </Teleport>

        <Teleport to="body">
            <ServerError :show="showError" @close="showError = false"></ServerError>
        </Teleport>

        <Teleport to="body">
            <ModalTextContent :button="'Reprendre'" :title="'Mode indisponible'" :show="showAccountRequiredModal" @close="showAccountRequiredModal = false">
                Vous devez être connecté pour participer au défis quotidien.
            </ModalTextContent>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { ref } from 'vue';

    import router from '@/router/router';

    import { useSoloModeStore } from '@/stores/soloMode';
    import { useAccountStore } from '@/stores/account';

    import SoloMode from '@/static/soloMode';
    import Utils from '@/static/utils';
    import Leaderboards from '@/static/leaderboards';

    import ButtonRounded from '@/ui/buttons/ButtonRounded.vue';
    import ButtonClassic from '@/ui/buttons/ButtonClassic.vue';

    import ModalBigText from '@/components/popup/BasicBigContent.vue';
    import ModalTextContent from '@/components/popup/BasicTextContent.vue';
    import ServerError from '@/components/popup/ServerError.vue';
    
    import LargeHeader from '@/ui/text/LargeHeader.vue';
    import Text from '@/ui/text/Text.vue';
    import SmallHeader from '@/ui/text/SmallHeader.vue';

    const { dailychallengedone, loggedIn } = storeToRefs(useAccountStore());
    const { startPage, endPage, endPageSummary, showError, gameMode, dailyChallengeDifficulty } = storeToRefs(useSoloModeStore());

    const startPageLoading = ref(false);
    const endPageLoading = ref(false);

    const showModal = ref(false);
    const showAccountRequiredModal = ref(false);

    const challengeDifficultyText = ref("");

    if(dailyChallengeDifficulty.value == 1) challengeDifficultyText.value = "Facile";
    if(dailyChallengeDifficulty.value == 2) challengeDifficultyText.value = "Moyen";
    if(dailyChallengeDifficulty.value == 3) challengeDifficultyText.value = "Difficile";

    async function newStartPage() {
        if(startPageLoading.value != true) {
            startPageLoading.value = true;

            let result = await SoloMode.getStartPage();
            if(result == false) showError.value = true;
            
            startPageLoading.value = false;
        }
    }

    async function newEndPage() {
        if(endPageLoading.value != true) {
            endPageLoading.value = true;

            let result = await SoloMode.getEndPage();
            if(result == false) showError.value = true;

            endPageLoading.value = false;
        }
    }
    
    function playDailyChallenge() {
        if(loggedIn.value == true) router.replace('/solo/game');
        else showAccountRequiredModal.value = true;
    }
</script>

<style scoped>
    .text-white {
        color: var(--color-900) !important;
    }
    .text {
        display: -webkit-box;
        -webkit-line-clamp: 10;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .animation-rotate {
        animation: rotate 0.8s linear 0s infinite;
    }

    @keyframes rotate {
        0% { rotate: 0deg; }
        100% { rotate: 360deg; }
    }
</style>