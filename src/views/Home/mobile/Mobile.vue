<template>
    <div class="pl-24 pr-4 w-full h-28 flex items-center justify-center">
        <LargeHeader> Wikipedia Challenge </LargeHeader>
    </div>

    <div class="absolute w-[290px] h-[520px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -mt-1 bg-900 rounded-4xl p-6 shadow overflow-hidden">
        <div class="relative w-full h-full flex flex-col duration-500" :class="{ '-top-full': seeRules, '-mt-7': seeRules, 'top-0': !seeRules }">
            <!-- Slide container horizontal start -->
            <div class="relative overflow-hidden flex-1">
                <!-- Back arrow start -->
                <transition name="arrow-fade">
                    <div v-if="homeFormStep > 1" @click="router.go(-1)" class="absolute top-0 left-0 mt-3 z-20 cursor-pointer">
                        <img class="h-10 w-10" src="@/assets/icons/back-arrow.svg" />
                    </div>
                </transition>
                <!-- Back arrow start -->

                <router-view v-slot="{ Component, route }" class="absolute w-full h-full">
                    <transition :name=route.meta.useTransition>
                        <component @seeRules="seeRules = true" :is=Component />
                    </transition>
                </router-view>
            </div>
            <!-- Slide container horizontal end -->

            <!-- Current slide indicator start -->
            <div class="flex justify-center" v-if="!proposeRestore">
                <div class="relative flex flex-row gap-4">
                    <div v-for="i in 3" class="h-3 w-3 rounded-full bg-accent"></div>
                    <div :style="{ 'left': ((homeFormStep - 1) * 19) + 'px' }" class="absolute left-0 bg-100 h-3 w-3 rounded-full duration-500"></div>
                </div>
            </div>
            <!-- Current slide indicator end -->
        </div>

        <!-- Slide vertical start -->
        <div class="relative w-full h-full duration-500 flex flex-col mt-7 -top-full" :class="{ 'top-0': !seeRules }">
            <div class="flex flex-row justify-center cursor-pointer" @click="seeRules = false">
                <img class="h-12 w-12" src="@/assets/icons/arrow-up.svg" />
            </div>

            <Text class="text-center mt-8">
                Voyage à travers Wikipedia d'une page de départ à une page d'arrivée en utilisant que les liens de redirections.
                <br /><br /><br />
                Joues avec tes amis dans un salon privé et découvre les différents modes de jeux&nbsp;!
                <br /><br /><br />
                Personnalise ta partie en choisissant la page de départ et d'arrivée ainsi que les différentes règles du jeu&nbsp;!
            </Text>

            <div class="mt-10 flex flex-row justify-center">
                <ButtonContent class="w-full text-center" @click="seeRules = false">
                    <Text> C'est&nbsp;compris&nbsp;! </Text>
                </ButtonContent>
            </div>
        </div>
        <!-- Slide vertical end -->
    </div>

    <!-- Account -->
    <!-- <div class="absolute left-0 top-full -translate-y-full w-full pl-6 pr-6 pb-4">
        <router-link to="/settings/account/create">
            <div class="flex flex-row gap-3 bg-accent2 rounded-full p-3 items-center justify-center cursor-pointer">
                <img class="h-10 w-10" src="@/assets/icons/account.svg" />
                <Header> Crée un compte </Header>
            </div>
        </router-link>
    </div> -->
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { RouterView } from 'vue-router';
    import { ref } from 'vue';
    import router from '@/router/router';

    import { useGeneralStore } from '@/stores/general';

    import ButtonContent from '@/ui/buttons/ButtonContent.vue';
    import Text from '@/ui/text/Text.vue';
    import Header from '@/ui/text/Text.vue';
import LargeHeader from '@/ui/text/LargeHeader.vue';

    const { homeFormStep, proposeRestore } = storeToRefs(useGeneralStore());

    const seeRules = ref(false);
</script>

<style scoped>
    /* Back arrow fade transition with delay */
    .arrow-fade-enter-active { transition: 0.3s; transition-delay: 0.4s; }
    .arrow-fade-leave-active { transition: 0.1s; }
    .arrow-fade-enter-from, .arrow-fade-leave-to  { opacity: 0; }
    .arrow-fade-enter-to, .arrow-fade-leave-from { opacity: 1; }
</style>