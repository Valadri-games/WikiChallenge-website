<template>
    <div class="absolute w-full h-full overflow-hidden flex flex-col">
        <div class="flex flex-row justify-center items-center ml-8 mr-8 mt-6 gap-20">
            <div @click="router.go(-1);">
                <img class="h-10 w-10 cursor-pointer" src="@/assets/icons/back-arrow.svg" />
            </div>

            <LargeHeader class="text-center color-100"> Mode solo </LargeHeader>
            <img class="h-12 w-12" src="@/assets/icons/play-solo.svg" />
        </div>

        <div class="mt-8 pl-6 pr-6">
            <Text> Départ </Text>

            <div class="relative w-full mt-2 pb-3">
                <input type="text" placeholder="Page de départ" :value="startPage.replaceAll('_', ' ')" class="bg-900 color-100 w-full border-4 border-100 p-4 pl-6 pr-20 text-size rounded-full shadow text-ellipsis" spellcheck="false" autocomplete="false" />

                <ButtonRounded @click="newStartPage" animation="scale" class="absolute top-1/2 -translate-y-1/2 -mt-[4.5px] left-full -ml-[54px] scale-[0.75]">
                    <img class="h-12 w-12" src="@/assets/icons/looped-arrow.svg" :class="{ 'animation-rotate': startPageLoading }" />
                </ButtonRounded>
            </div>
        </div>

        <div class="mt-8 pl-6 pr-6">
            <Text> Arrivée </Text>

            <div class="relative w-full mt-2 pb-3">
                <input type="text" placeholder="Page d'arrivée" :value="endPage.replaceAll('_', ' ')" class="bg-900 color-100 w-full border-4 border-100 p-4 pl-6 pr-20 text-size rounded-full shadow text-ellipsis" spellcheck="false" autocomplete="false" />

                <ButtonRounded @click="newEndPage" animation="scale" class="absolute top-1/2 -translate-y-1/2 -mt-[4.5px] left-full -ml-[54px] scale-[0.75]">
                    <img class="h-12 w-12" src="@/assets/icons/looped-arrow.svg" :class="{ 'animation-rotate': endPageLoading }" />
                </ButtonRounded>
            </div>
        </div>

        <div class="flex-1 flex flex-col mb-32 w-full overflow-hidden mt-10">
            <div class="bg-100 ml-6 mr-6 rounded-3xl">
                <Text class="ml-4 color-900 text-white mt-3"> Définition de la page finale </Text>

                <div class="flex-1 flex flex-col border-4 border-100 p-4 rounded-3xl bg-900">
                    <Text class="flex-1 text !text-xl">
                        {{ endPageSummary }}
                    </Text>

                    <SmallHeader class="!text-2xl text-center mt-3 cursor-pointer" @click="showModal = true"> VOIR PLUS </SmallHeader>
                </div>
            </div>
        </div>

        <div class="absolute top-full -translate-y-full left-1/2 -translate-x-1/2 pb-8" :class="{ 'pointer-events-none': startPageLoading || endPageLoading, 'opacity-50': startPageLoading || endPageLoading }">
            <ButtonClassic @click="router.replace('/solo/game')"> Jouer </ButtonClassic>
        </div>

        <Teleport to="body">
            <Modal :show="showModal" @close="showModal = false">
                {{ endPageSummary }}
            </Modal>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { ref } from 'vue';

    import router from '@/router/router';

    import { useSoloModeStore } from '@/stores/soloMode';

    import SoloMode from '@/static/soloMode';

    import ButtonRounded from '@/ui/buttons/ButtonRounded.vue';
    import ButtonClassic from '@/ui/buttons/ButtonClassic.vue';

    import Modal from '@/views/Solo/Lobby/mobile/Modal.vue';
    
    import LargeHeader from '@/ui/text/LargeHeader.vue';
    import Text from '@/ui/text/Text.vue';
    import SmallHeader from '@/ui/text/SmallHeader.vue';

    const { startPage, endPage, endPageSummary } = storeToRefs(useSoloModeStore());

    const startPageLoading = ref(false);
    const endPageLoading = ref(false);

    const showModal = ref(false);

    async function newStartPage() {
        if(startPageLoading.value != true) {
            startPageLoading.value = true;
            await SoloMode.getStartPage();

            startPageLoading.value = false;
        }
    }

    async function newEndPage() {
        if(endPageLoading.value != true) {
            endPageLoading.value = true;
            await SoloMode.getEndPage();

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
        -webkit-line-clamp: 9;
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