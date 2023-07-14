<template>
    <div class="absolute w-full h-full overflow-hidden flex flex-col">
        <div class="flex flex-row justify-center items-center ml-8 mr-8 mt-6 gap-20">
            <div @click="router.go(-1);">
                <img class="h-10 w-10 cursor-pointer" src="@/assets/icons/back-arrow.svg" />
            </div>

            <LargeHeader v-if="gameMode != 5" class="text-center color-100"> Mode solo </LargeHeader>
            <LargeHeader v-if="gameMode == 5" class="text-center color-100"> Défi quotidien </LargeHeader>
            <img class="h-12 w-12" src="@/assets/icons/play-solo.svg" />
        </div>

        <div v-if="gameMode == 5" class="mt-5 ml-6 mr-6 flex flex-row gap-2 items-center justify-center">
            <div class="flex-1">
                <Text v-if="!dailychallengedone"> Il te reste <span class="font-bold">{{ Utils.convertMsToDuration(Utils.getTimeToTomorrow()) }}</span> pour participer&nbsp;! </Text>
                <Text v-if="dailychallengedone"> Tu as déjà participé aujourd'hui. Reviens demain pour un nouveau défi. </Text>
            </div>

            <div>
                <div class="border-3 border-100 bg-accent2 p-2 pl-5 pr-5 rounded-full w-fit">
                    <Text> Facile </Text>
                </div>
            </div>
        </div>

        <div class="mt-5 pl-6 pr-6">
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
            </div>
        </div>

        <div class="flex-1 flex flex-col w-full overflow-hidden mt-5 mb-32">
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

        <!-- <div class="absolute top-full -translate-y-full left-1/2 -translate-x-1/2 pb-8" :class="{ 'pointer-events-none': startPageLoading || endPageLoading, 'opacity-50': startPageLoading || endPageLoading }">
            <ButtonClassic @click="router.replace('/solo/game')"> Jouer </ButtonClassic>
        </div> -->

        <div class="absolute left-0 top-full -translate-y-full w-full flex justify-center pb-8 gap-5">
            <ButtonClassic :secondOption="true" :small-pad="true" @click="router.replace('/solo/')" class="pointer-events-none opacity-50"> Voir le classement </ButtonClassic>
            <ButtonClassic v-if="!dailychallengedone" :small-pad="true" @click="router.replace('/solo/game')"> Jouer </ButtonClassic>
        </div>

        <Teleport to="body">
            <ModalBigText :button="'Fermer'" :title="endPage.replaceAll('_', ' ')" :show="showModal" @close="showModal = false">
                {{ endPageSummary }}
            </ModalBigText>
        </Teleport>

        <Teleport to="body">
            <ServerError :show="showError" @close="showError = false"></ServerError>
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

    import ButtonRounded from '@/ui/buttons/ButtonRounded.vue';
    import ButtonClassic from '@/ui/buttons/ButtonClassic.vue';

    import ModalBigText from '@/components/popup/BasicBigContent.vue';
    import ServerError from '@/components/popup/ServerError.vue';
    
    import LargeHeader from '@/ui/text/LargeHeader.vue';
    import Text from '@/ui/text/Text.vue';
    import SmallHeader from '@/ui/text/SmallHeader.vue';

    const { dailychallengedone } = storeToRefs(useAccountStore());
    const { startPage, endPage, endPageSummary, showError, gameMode } = storeToRefs(useSoloModeStore());

    const startPageLoading = ref(false);
    const endPageLoading = ref(false);

    const showModal = ref(false);

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