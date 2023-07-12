<template>
    <div>
        <!-- Desktop -->
        <div class="h-slide" v-if="!showMobile">
            <!-- Left flex start -->
            <div class="h-slide-part flex flex-col justify-center">
                <div class="flex flex-row justify-center items-center gap-5">
                    <img class="h-24" src="@/assets/icons/play-solo.svg" />
                    <Header> SOLO </Header>
                </div>

                <Text class="ml-20 mr-20 mt-16 text-justify">
                    Créé une partie solo personnalisée pour t'amuser et t'entrainer.
                    <br /><br />
                    Choisie parmis plusieurs mode de jeu et participe aux defis quotidien en 
                    réalisant le meilleurs temps ou le plus cours chemin&nbsp;!
                </Text>

                <div class="mt-16 flex justify-center">
                    <ButtonClassic @click="SoloMode.generateRandomPath()"> Jouer en solo </ButtonClassic>
                </div>
            </div>
            <!--  Left flex end -->
            
            <!-- Rigft flex start -->
            <div class="h-slide-part flex flex-col justify-center">
                <div class="flex flex-row justify-center items-center gap-5">
                    <img class="h-24" src="@/assets/icons/play-multi.svg" />
                    <Header> MULTIJOUEUR </Header>
                </div>

                <Text class="text-center font-bold mt-28">
                    Rejoindre une partie privée:
                </Text>

                <div class="mt-4 flex flex-row gap-8 pb-3 justify-center pointer-events-none opacity-50">
                    <input type="text" placeholder="XXXX" inputmode="numeric" class="bg-900 w-[145px] border-6 border-100 color-100 p-5 pl-10 pr-10 text-size rounded-full shadow" spellcheck="false" autocomplete="false" maxlength="4" />

                    <ButtonClassic class="mr-3"> Rejoindre </ButtonClassic>
                </div>

                <Text class="text-center font-bold mt-32">
                    Créer mon salon privée:
                </Text>

                <div class="mt-4 flex justify-center pointer-events-none opacity-50">
                    <ButtonClassic> Créer </ButtonClassic>
                </div>
            </div>
            <!-- Rigft flex end -->
        </div>
        
        <!-- Mobile -->
        <div class="absolute w-full h-full duration-500" v-if="showMobile">
            <Header class="text-center mt-3"> MODE DE JEU </Header>

            <Text class="text-center mt-14">
                Amuse-toi en affrontant tes ami.e.s dans un salon privé et en personnalisant ta partie&nbsp;! 
            </Text>

            <div class="mt-4 flex justify-center pointer-events-none opacity-50">
                <router-link to="/mode-2">
                    <ButtonContent class="flex flex-row items-center text-center w-[220px]">
                        <img class="h-10 w-10" src="@/assets/icons/play-multi2.svg" />
                        <Text class="flex-1 pointer-events-none"> Multijoueur </Text>
                    </ButtonContent>
                </router-link>
            </div>

            <Text class="text-center mt-20">
                Créer une partie solo personnalisée ou réalise le meilleure temps ou le plus court chemin du défi quotidien&nbsp;!
            </Text>

            <div class="mt-4 flex justify-center">
                <router-link to="/solo">
                    <ButtonContent class="flex flex-row items-center text-center w-[220px]">
                        <img class="h-10 w-10" src="@/assets/icons/play-solo2.svg" />
                        <Text class="flex-1 pointer-events-none"> Jouer solo </Text>
                    </ButtonContent>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { onMounted } from 'vue';

    import { useGeneralStore } from '@/stores/general';

    import SoloMode from '@/static/soloMode';

    import ButtonClassic from '@/ui/buttons/ButtonClassic.vue';
    import ButtonContent from '@/ui/buttons/ButtonContent.vue';
    
    import Header from '@/ui/text/Header.vue';
    import Text from '@/ui/text/Text.vue';

    const { homeFormStep, showMobile } = storeToRefs(useGeneralStore());

    onMounted(() => {
        homeFormStep.value = 2;
    });
</script>