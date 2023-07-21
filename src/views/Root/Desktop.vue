<template>
    <div class="absolute bg-900 w-[1450px] h-[850px] rounded-4xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-8 container-solid-shadow flex flex-col origin-top-left" :style="{ 'scale': containerScale }">
        <LargeHeader class="text-center color-100"> Wikipedia Challenge </LargeHeader>

        <!-- Back arrow start -->
        <Transition name="fade">
            <div v-if="homeFormStep > 1" @click="router.go(-1);" class="absolute top-0 left-0 mt-20 ml-12 cursor-pointer">
                <img class="h-16 w-16" src="@/assets/icons/back-arrow.svg" />
            </div>
        </Transition>
        <!-- Back arrow start -->

        <!-- Slide container start -->
        <div class="relative flex-1 overflow-hidden">
            <router-view v-slot="{ Component, route }" class="absolute w-full h-full">
                <Transition :name=route.meta.useTransition>
                    <component :is=Component />
                </Transition>
            </router-view>
        </div>
        <!-- Slide container end -->

        <!-- Current slide indicator start -->
        <div class="flex justify-center gap-5">
            <div class="relative flex flex-row gap-5">
                <div v-for="i in 3" class="bg-accent h-5 w-5 rounded-full"></div>
                <div :style="{ 'left': ((homeFormStep - 1) * 25) + 'px' }" class="absolute ml-0 left-0 bg-100 h-5 w-5 rounded-full duration-500"></div>
            </div>
        </div>
        <!-- Current slide indicator end -->
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { ref } from 'vue';
    import { RouterView } from 'vue-router';
    import router from '@/router/router';

    import { useGeneralStore } from '@/stores/general';

    import LargeHeader from '@/ui/text/LargeHeader.vue';

    const { homeFormStep } = storeToRefs(useGeneralStore());

    const containerScale = ref(calcScale());
    function calcScale() {
        let widthRatio = document.documentElement.clientWidth / 1920;
        let heightRatio = document.documentElement.clientHeight / 1080;

        if(widthRatio < heightRatio) return widthRatio;
        else return heightRatio;
    }

    window.addEventListener('resize', () => {
        containerScale.value = calcScale();
    });
</script>

<style scoped>
    .fade-enter-active { transition: 0.5s; transition-delay: 0.5s; }
    .fade-leave-active { transition: 0.5s; }
    .fade-enter-from, .fade-leave-to  { opacity: 0; }
    .fade-enter-to, .fade-leave-from { opacity: 1; }
</style>