<template>
    <div class="absolute w-full h-full flex flex-col">
        <div class="flex flex-row justify-center items-center ml-4 mr-4 mt-6 gap-20">
            <router-link to="/">
                <img class="h-14 w-14 cursor-pointer" src="@/assets/icons/close.svg" />
            </router-link>

            <LargeHeader class="text-center color-100"> Mode solo </LargeHeader>
            <img class="h-12 w-12" src="@/assets/icons/play-solo.svg" />
        </div>

        <div class="flex-1 flex flex-col mb-36 mt-10 justify-center overflow-hidden">
            <div class="overflow-hidden flex flex-col">
                <div class="w-full pl-6 pr-6 flex overflow-hidden will-change-transform">
                    <div ref=modeListDiv class="flex-1 flex flex-col gap-3 bg-accent border-4 border-100 rounded-3xl p-3 overflow-auto hide-scroll">
                        <div class="list-element border-accent" @click="gameMode = 1" :class="{ 'border-100': gameMode == 1, 'opacity-80': gameMode != 1 }">
                            <Text class="!font-bold"> FACILE </Text>
                            <Text class="mt-1"> Page les plus visitées de Wikipedia en français. </Text>
                        </div>

                        <div class="list-element border-accent" @click="gameMode = 2" :class="{ 'border-100': gameMode == 2, 'opacity-80': gameMode != 2 }">
                            <div class="flex flex-row items-center gap-4">
                                <Text class="!font-bold flex-1"> MOYEN </Text>

                                <div class="scale-90 border-3 border-100 bg-accent2 p-2 pl-4 pr-4 rounded-full w-fit h-14">
                                    <Text> XP x1.5 </Text>
                                </div>
                            </div>

                            <Text class="mt-1"> Selections de pages moins connus, demandera un peu de patience. </Text>
                        </div>

                        <div class="list-element border-accent" @click="gameMode = 3" :class="{ 'border-100': gameMode == 3, 'opacity-80': gameMode != 3 }">
                            <div class="flex flex-row items-center gap-4">
                                <Text class="!font-bold flex-1"> DIFFICILE </Text>

                                <div class="scale-90 border-3 border-100 bg-accent2 p-2 pl-4 pr-4 rounded-full w-fit h-14">
                                    <Text> XP x2 </Text>
                                </div>
                            </div>

                            <Text class="mt-1"> Un mode difficile où la culture générale sera votre meilleur allié. </Text>
                        </div>

                        <div class="list-element border-accent" @click="gameMode = 4" :class="{ 'border-100': gameMode == 4, 'opacity-80': gameMode != 4 }">
                            <Text class="!font-bold"> ALEATOIRE </Text>
                            <Text class="mt-1"> Page aléatoire parmis toutes les pages votées comme étant intéréssantes. </Text>
                        </div>
                    </div>

                    <ButtonRounded @click=scrollModes class="fixed top-full -translate-y-full left-full -ml-[73px] -mt-[3px] scale-[0.75] bg-900">
                        <img class="h-12 w-12" src="@/assets/icons/arrow-down.svg" />
                    </ButtonRounded>
                </div>

                <Text class="text-center mt-6 !font-bold"> OU </Text>

                <div class="ml-6 mr-6 rounded-3xl mt-6 flex bg-accent">
                    <div class="list-element border-accent max-h-fit" @click="gameMode = 5" :class="{ 'border-100': gameMode == 5, 'opacity-80': gameMode != 5 }">
                        <Text class="!font-bold"> DEFI QUOTIDIEN </Text>
                        <Text class="mt-1"> Découvre le défis quotidien et réalise la meilleure performance </Text>
                    </div>
                </div>
            </div>
        </div>

        <div class="absolute top-full -translate-y-full left-1/2 -translate-x-1/2 pb-8 flex justify-center">
            <ButtonClassic @click="play"> Jouer </ButtonClassic>
        </div>

        <Teleport to="body">
            <ServerError :show="showError" @close="showError = false"></ServerError>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { storeToRefs } from 'pinia';

    import { useSoloModeStore } from '@/stores/soloMode';

    import ButtonRounded from '@/ui/buttons/ButtonRounded.vue';
    import ButtonClassic from '@/ui/buttons/ButtonClassic.vue';
    
    import LargeHeader from '@/ui/text/LargeHeader.vue';
    import Text from '@/ui/text/Text.vue';

    import SoloMode from '@/static/soloMode';

    import ServerError from '@/components/popup/ServerError.vue';

    useSoloModeStore().reset();

    const { gameMode, showError } = storeToRefs(useSoloModeStore());

    const modeListDiv = ref();

    function scrollModes() {
        let element = modeListDiv.value as HTMLElement;

        element.scroll({
            top: 1000,
            left: 0,
            behavior: 'smooth'
        });
    }

    function play() {
        if(gameMode.value != 5) SoloMode.generateRandomPath();
        else SoloMode.playDailyChallenge();
    }
</script>

<style scoped>
    .list-element {
        padding: 0.80rem;
        background-color: var(--color-900);
        border-radius: 1.5rem;
        border-width: 4px;
        transition: 300ms;
    }
</style>