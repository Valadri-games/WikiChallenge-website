<template>
    <div class="absolute w-full h-full overflow-hidden flex flex-col">
        <div class="absolute h-full w-full duration-500" :class="{ 'top-0': showPath == false, '-top-full': showPath }">
            <div class="flex justify-center items-center" :class="{ 'opacity-0': !animationStep2 }">
                <Avatar :shadow="false" :win="true" :avatarID=avatarid class="h-72 w-72" />
            </div>

            <div class="mt-12 duration-500" :class="{ 'opacity-0': !animationStep2 }">
                <Header class="text-center w-full"> Félicitations ! </Header>

                <Text class="text-center w-full mt-6 pl-8 pr-8"> Tu as trouvé la page "{{ endPage.replaceAll("_", " ") }}" </Text>
            </div>

            <div class="mt-14 flex flex-row ml-12 mr-12 justify-center">
                <Header class="w-0 overflow-hidden duration-500" :class="{ 'w-[92px]': animationStep1 }"> Score:&nbsp; </Header>
                
                <transition name="scale">
                    <Header v-if="animationStep0"> {{ scoreCounter }} </Header>
                </transition>
            </div>

            <div class="mt-14 flex flex-row gap-12 ml-12 mr-12 justify-center duration-500" :class="{ 'opacity-0': !animationStep3 }">
                <div class="flex flex-col items-center bg-100 rounded-3xl pt-2">
                    <Text class="text-white"> TEMPS </Text>

                    <div class="-mt-1 flex flex-row gap-6 items-center p-4 border-4 border-100 rounded-3xl bg-900">
                        <img src="@/assets/icons/timer.svg" />
                        <Text> {{ Utils.convertMsToTime(totalTime) }} </Text>
                    </div>
                </div>

                <div class="flex flex-col items-center bg-100 rounded-3xl pt-2">
                    <Text class="text-white ml-8 mr-8"> ETAPES </Text>

                    <div class="-mt-1 flex flex-row items-center h-full border-4 border-100 rounded-3xl bg-900 w-full">
                        <Text class="text-center w-full"> {{ steps }} </Text>
                    </div>
                </div>
            </div>

            <div class="absolute top-full left-1/2 -translate-x-1/2 -translate-y-full -mt-8 flex flex-col gap-6 duration-500" :class="{ 'opacity-0': !animationStep4 }">
                <ButtonClassic @click="router.go(-1)" :secondOption="true">Lire&nbsp;la&nbsp;page</ButtonClassic>
                <ButtonClassic @click="showPath = true">Voir&nbsp;mon&nbsp;parcours</ButtonClassic>
            </div>
        </div>

        <div class="absolute h-full w-full flex flex-col duration-500" :class="{ 'top-0': showPath, 'top-full': showPath == false }">
            <div @click="showPath = false" class="absolute top-0 left-0 mt-5 ml-5 z-20">
                <img class="h-12 w-12" src="@/assets/icons/arrow-up.svg" />
            </div>

            <div class="relative flex-1 overflow-auto pt-6">
                <div v-for="(pageTitle, index) in pagesPath" class="ml-24 mr-10 mb-4">
                    <div v-if="pagesPath.length >= 2 && pagesPath[index] == pagesPath[index - 1]" class="mb-6 border-3 border-100 bg-accent2 p-2 pl-5 pr-5 rounded-full w-fit">
                        <Text> Pause </Text>
                    </div>

                    <div class="flex flex-row gap-10">
                        <div class="flex flex-col items-center">
                            <div class="h-8 min-h-[2rem] w-8 rounded-full border-3 border-100" :class="{ 'bg-accent': index == 0 || index == pagesPath.length - 1 }"></div>
                            <div v-if="index != pagesPath.length - 1 " class="h-full min-h-[30px] w-1.5 bg-100 rounded-full mt-2"></div>
                        </div>

                        <div class="flex-1">
                            <Text> {{ pageTitle.replaceAll('_', ' ') }} </Text>
                            <Text> {{ Utils.convertMsToTime(Utils.calcGameTime(gameTimerPauses.slice(0, index * 2))) }} </Text>
                        </div>
                    </div>
                </div>
            </div>

            <hr class="border-2 ml-12 mr-12 rounded-full" />

            <div class="mt-8 flex flex-col justify-center items-center">
                <div class="flex flex-col justify-center items-center">
                    <Text> Ce parcours était-il intéressant ? </Text>

                    <div class="mt-4 flex flex-row gap-10 pl-10 pr-10 justify-center items-center">
                        <label class="p-4 pl-8 pr-8 border-4 border-100 rounded-3xl color-100 text-size shadow bg-900 duration-300" :class="{ 'bg-accent': pathFun ==  1}">
                            Non
                            <input @click="pathFun = 1" class="hidden" type="radio" name="pathFun" />
                        </label>

                        <label class="p-4 pl-8 pr-8 border-4 border-100 rounded-3xl color-100 text-size shadow bg-900 duration-30" :class="{ 'bg-accent': pathFun ==  2}">
                            Neutre
                            <input @click="pathFun = 2" class="hidden" type="radio" name="pathFun" />
                        </label>

                        <label class="p-4 pl-8 pr-8 border-4 border-100 rounded-3xl color-100 text-size shadow bg-900 duration-30" :class="{ 'bg-accent': pathFun ==  3}">
                            Oui
                            <input @click="pathFun = 3" class="hidden" type="radio" name="pathFun" />
                        </label>
                    </div>
                </div>

                <div class="mt-10 flex flex-col justify-center items-center">
                    <Text> Ce parcours était-il trop difficile ? </Text>

                    <div class="mt-4 flex flex-row gap-10 pl-10 pr-10 justify-center items-center">
                        <label class="p-4 pl-8 pr-8 border-4 border-100 rounded-3xl color-100 text-size shadow bg-900 duration-300" :class="{ 'bg-accent': pathDifficulty ==  1}">
                            Non
                            <input @click="pathDifficulty = 1" class="hidden" type="radio" name="pathDifficulty" />
                        </label>

                        <label class="p-4 pl-8 pr-8 border-4 border-100 rounded-3xl color-100 text-size shadow bg-900 duration-30" :class="{ 'bg-accent': pathDifficulty ==  2}">
                            Neutre
                            <input @click="pathDifficulty = 2" class="hidden" type="radio" name="pathDifficulty" />
                        </label>

                        <label class="p-4 pl-8 pr-8 border-4 border-100 rounded-3xl color-100 text-size shadow bg-900 duration-30" :class="{ 'bg-accent': pathDifficulty ==  3}">
                            Oui
                            <input @click="pathDifficulty = 3" class="hidden" type="radio" name="pathDifficulty" />
                        </label>
                    </div>
                </div>

                <div class="relative w-full flex justify-center mt-16 mb-10">
                    <ButtonClassic class="max-w-fit" @click="finish"> Continuer </ButtonClassic>

                    <router-link to="/account-infos" v-if="!loggedIn">
                        <ButtonRounded class="absolute left-full -translate-x-full -ml-4 min-w-max !p-2.5"> <img class="h-10 w-10" src="@/assets/icons/save.svg" /> </ButtonRounded>
                    </router-link>
                </div>  
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { onMounted, ref } from 'vue';

    import router from '@/router/router';

    import { useAccountStore } from '@/stores/account';
    import { useSoloModeStore } from '@/stores/soloMode';

    import { socket } from '@/socket';

    import Utils from '@/static/utils';

    import Avatar from '@/components/avatar/Avatar.vue';

    import Header from '@/ui/text/Header.vue';
    import Text from '@/ui/text/Text.vue';

    import ButtonClassic from '@/ui/buttons/ButtonClassic.vue';
    import ButtonRounded from '@/ui/buttons/ButtonRounded.vue';

    const animationStep0 = ref(false);
    const animationStep1 = ref(false);
    const animationStep2 = ref(false);
    const animationStep3 = ref(false);
    const animationStep4 = ref(false);

    const { avatarid, loggedIn } = storeToRefs(useAccountStore());

    const { endPage, pagesPath, totalTime, gameTimerPauses, steps, score } = storeToRefs(useSoloModeStore());

    const showPath = ref(false);

    const pathFun = ref(0);
    const pathDifficulty = ref(0);

    const scoreCounter = ref(0);
    
    function finish() {
        if(pathFun.value == 1 || pathFun.value == 3) socket.emit('pathFun', pathFun.value);
        if(pathDifficulty.value == 1 || pathDifficulty.value == 3) socket.emit('pathDifficulty', pathDifficulty.value);

        router.push('/solo');
    }

    let counter: any;
    function counterAnimation() {
        scoreCounter.value += 7;

        if(scoreCounter.value >= score.value) {
            scoreCounter.value = score.value;
            clearInterval(counter);
        }
    }

    onMounted(() => {
        setTimeout(() => {
            animationStep0.value = true;
            counter = setInterval(counterAnimation, 3);
        }, 300);

        setTimeout(() => {
            animationStep1.value = true;
        }, 300 + 600);

        setTimeout(() => {
            animationStep2.value = true;
        }, 300 + 600 + 200);

        setTimeout(() => {
            animationStep3.value = true;
        }, 300 + 600 + 200 + 100);

        setTimeout(() => {
            animationStep4.value = true;
        }, 300 + 600 + 200 + 100 + 200);
    });
</script>

<style scoped>
    .text-white {
        color: var(--color-900) !important;
    }

    /* Scale */
    .scale-enter-active, .scale-leave-active { transition: 0.8s; }
    .scale-enter-from, .scale-leave-to  { scale: 5; }
    .scale-enter-to, .scale-leave-from { scale: 1; }
</style>