<template>
    <div class="absolute w-full h-full top-0 left-0 bg-accent">
        <div class="absolute bg-900 w-[1450px] h-[850px] rounded-4xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-8 container-solid-shadow flex flex-col origin-top-left" :style="{ 'scale': containerScale }">
            <div class="flex flex-row items-center justify-center h-36">
                <!-- Back arrow start -->
                <div @click="router.push('/')" class="ml-12 cursor-pointer">
                    <img class="h-20 w-20" src="@/assets/icons/close.svg" />
                </div>
                <!-- Back arrow start -->

                <Header class="flex-1 text-center color-100"> MODE SOLO </Header>

                <div class="mr-12">
                    <img class="h-20 w-20" src="@/assets/icons/play-solo.svg" />
                </div>
            </div>
            
            <div class="relative flex-1 overflow-hidden">
                <div class="absolute w-full h-full">
                    <div class="h-slide">
                        <!-- Left flex start -->
                        <div class="h-slide-part flex flex-col bg-blue">
                            <div class="pl-6 pr-6">
                                <Text class="!font-bold"> Départ </Text>

                                <div class="relative w-full mt-2 pr-10">
                                    <input type="text" placeholder="Page de départ" :value="startPage.replaceAll('_', ' ')" class="bg-900 color-100 w-full border-6 border-100 p-5 pl-12 pr-24 text-size rounded-full shadow text-ellipsis" spellcheck="false" autocomplete="false" />

                                    <ButtonRounded @click="newStartPage" animation="scale" class="absolute top-1/2 -translate-y-1/2 -mt-[4.5px] left-full p-5 -ml-[105px] scale-90">
                                        <img class="h-12 scale-25" src="@/assets/icons/looped-arrow.svg" :class="{ 'animation-rotate': startPageLoading }" />
                                    </ButtonRounded>
                                </div>
                            </div>

                            <div class="mt-12 pl-6 pr-6">
                                <Text class="!font-bold"> Arrivée </Text>

                                <div class="relative w-full mt-2 pb-3 pr-10">
                                    <input type="text" placeholder="Page d'arrivée" :value="endPage.replaceAll('_', ' ')" class="bg-900 color-100 w-full border-6 border-100 p-6 pl-6 pr-20 text-size rounded-full shadow text-ellipsis" spellcheck="false" autocomplete="false" />

                                    <ButtonRounded @click="newEndPage" animation="scale" class="absolute top-1/2 -translate-y-1/2 -mt-[4.5px] left-full p-5 -ml-[105px] scale-90">
                                        <img class="h-12 scale-25" src="@/assets/icons/looped-arrow.svg" :class="{ 'animation-rotate': endPageLoading }" />
                                    </ButtonRounded>
                                </div>
                            </div>

                            <Text class="mt-10 ml-6 !font-bold"> Définition de la page finale </Text>

                            <div class="flex-1 flex flex-col w-full overflow-hidden mt-2">
                                <div class="flex-1 flex flex-col border-4 border-100 p-4 ml-6 mr-6 rounded-3xl overflow-hidden">
                                    <Text class="flex-1 text !text-4xl">
                                        {{ endPageSummary }}
                                    </Text>

                                    <SmallHeader class="!text-3xl text-center mt-3 cursor-pointer" @click="showModal = true"> VOIR PLUS </SmallHeader>
                                </div>
                            </div>
                        </div>
                        <!--  Left flex end -->
                        
                        <!-- Rigft flex start -->
                        <div class="h-slide-part flex flex-col bg-red-">
                            <div class="w-full pl-6 pr-6 flex overflow-hidden will-change-transform">
                                <div ref=modeListDiv class="flex-1 flex flex-col gap-3 bg-accent border-4 border-100 rounded-3xl p-3 overflow-auto hide-scroll">
                                    <div class="list-element border-accent" @click="gameMode = 1" :class="{ 'border-100': gameMode == 1, 'opacity-80': gameMode != 1 }">
                                        <Text class="!font-bold"> FACILE </Text>
                                        <Text class="mt-1"> Page les plus visitées de Wikipedia en français. </Text>
                                    </div>

                                    <div class="list-element border-accent" @click="gameMode = 2" :class="{ 'border-100': gameMode == 2, 'opacity-80': gameMode != 2 }">
                                        <Text class="!font-bold"> MOYEN </Text>
                                        <Text class="mt-1"> Selections de pages moins connus, demandera un peu de patience. </Text>
                                    </div>

                                    <div class="list-element border-accent" @click="gameMode = 3" :class="{ 'border-100': gameMode == 3, 'opacity-80': gameMode != 3 }">
                                        <Text class="!font-bold"> DIFFICILE </Text>
                                        <Text class="mt-1"> Un mode difficile où la culture générale sera votre meilleur allié. </Text>
                                    </div>

                                    <div class="list-element border-accent" @click="gameMode = 4" :class="{ 'border-100': gameMode == 4, 'opacity-80': gameMode != 4 }">
                                        <Text class="!font-bold"> ALEATOIRE </Text>
                                        <Text class="mt-1"> Page aléatoire parmis toutes les pages votées comme étant intéréssantes. </Text>
                                    </div>
                                </div>

                                <ButtonRounded @click=scrollModes class="fixed top-full -translate-y-full left-full -ml-[103px] -mt-[10px] scale-90 bg-900">
                                    <img class="h-14 scale-125" src="@/assets/icons/arrow-down.svg" />
                                </ButtonRounded>
                            </div>

                            <Header class="text-center mt-6"> OU </Header>

                            <div class="pointer-events-none opacity-50">
                                <div class="ml-6 mr-6 rounded-2xl mt-6 flex overflow-hidden bg-accent">
                                    <div class="list-element border-accent max-h-fit" @click="gameMode = 5" :class="{ 'border-100': gameMode == 5, 'opacity-80': gameMode != 5 }">
                                        <Text class="!font-bold"> DEFI QUOTIDIEN </Text>
                                        <Text class="mt-1"> Découvre le défis quotidien et réalise la meilleure performance </Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Rigft flex end -->
                    </div>
                </div>
            </div>

            <div class="flex flex-row items-center justify-center">
                <ButtonClassic class="mt-8" @click="router.replace('/solo/game')"> Jouer </ButtonClassic>
            </div>
        </div>

        <Teleport to="body">
            <Modal :show="showModal" @close="showModal = false">
                {{ endPageSummary }}
            </Modal>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import router from '@/router/router';

    import { useGeneralStore } from '@/stores/general';
    import { useSoloModeStore } from '@/stores/soloMode';

    import SoloMode from '@/static/soloMode';

    import ButtonClassic from '@/ui/buttons/ButtonClassic.vue';
    import ButtonRounded from '@/ui/buttons/ButtonRounded.vue';
    
    import Text from '@/ui/text/Text.vue';
    import Header from '@/ui/text/Header.vue';
    import SmallHeader from '@/ui/text/SmallHeader.vue';

    import Modal from '@/views/Solo/GameMode/Modal.vue';

    const { homeFormStep } = storeToRefs(useGeneralStore());

    const { gameMode, showError } = storeToRefs(useSoloModeStore());
    const { startPage, endPage, endPageSummary } = storeToRefs(useSoloModeStore());

    const displayInputWarning = ref(false);
    const containerScale = ref(calcScale());

    const modeListDiv = ref();

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

    function scrollModes() {
        let element = modeListDiv.value as HTMLElement;

        element.scroll({
            top: 1000,
            left: 0,
            behavior: 'smooth'
        });
    }

    function calcScale() {
        let widthRatio = document.documentElement.clientWidth / 1920;
        let heightRatio = document.documentElement.clientHeight / 1080;

        if(widthRatio < heightRatio) return widthRatio;
        else return heightRatio;
    }

    onMounted(() => {
        homeFormStep.value = 1;
        pushState();
    });

    onUnmounted(() => {
        window.removeEventListener("popstate", pushState);
    });

    function pushState() {
        history.pushState({}, "");
    }

    window.addEventListener("popstate", pushState);
    window.addEventListener('resize', () => {
        containerScale.value = calcScale();
    });
</script>

<style scoped>
    .list-element {
        padding: 0.75rem;
        background-color: var(--color-900);
        border-radius: 1rem;
        border-width: 4px;
        transition: 300ms;
        cursor: pointer;
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