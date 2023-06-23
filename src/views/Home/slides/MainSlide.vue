<template>
    <div>
        <!-- Desktop --> 
        <div class="h-slide" v-if="!showMobile">
            <!-- Left flex start -->
            <div class="h-slide-part">
                <Text class="absolute top-1/2 -translate-y-1/2 pl-20 pr-20 text-justify">
                    Voyage à travers Wikipedia d'une page de départ à une page d'arrivée en utilisant que les liens de redirections.
                    <br /><br />
                    Joues avec tes amis dans un salon privé et découvre les différents modes de jeux&nbsp;!
                    <br /><br />
                    Personnalise ta partie en choisissant la page de départ et d'arrivée ainsi que les différentes règles du jeu&nbsp;!
                    
                    <img class="h-56 m-auto mt-14" src="@/assets/images/ill1.svg" />
                </Text>
            </div>
            <!--  Left flex end -->
            
            <!-- Rigft flex start -->
            <div class="h-slide-part">
                <div class="absolute top-1/2 -translate-y-1/2 w-full">
                    <div class="relative pb-5 w-full flex justify-center">
                        <Avatar :avatarID=avatarID class="w-96 h-96" />

                        <div class="absolute top-full -translate-y-full -ml-56">
                            <ButtonRounded @click=regenerateAvatar>
                                <img class="m-auto h-20 w-20" src="@/assets/icons/looped-arrow.svg" />
                            </ButtonRounded>
                        </div>
                    </div>

                    <div class="mt-20 flex flex-col items-center pb-3">
                        <Text class="w-[500px] !font-bold"> Choisis un pseudo </Text>
                        
                        <div class="relative mt-4">
                            <input @input=writingInput @keyup.enter=buttonClicked v-model=playerName type="text" placeholder="Joueur 123" class="bg-900 color-100 border-6 w-[500px] border-100 p-5 pl-10 pr-10 text-size rounded-full shadow outline-none" spellcheck="false" autocomplete="false" maxlength="25"  />
                            <img class="h-14 absolute left-full top-1/2 -translate-x-full -translate-y-1/2 -ml-12" :class="{ 'opacity-0': !displayInputWarning }" src="@/assets/icons/warning.svg" />
                        </div>

                        <ButtonClassic class="mt-14" @click=buttonClicked> Jouer </ButtonClassic>
                    </div>
                </div>
            </div>
            <!-- Rigft flex end -->
        </div>

        <!-- Mobile --> 
        <div class="absolute w-full duration-500" v-if="showMobile">
            <div class="relative w-full flex justify-center mt-4">
                <Avatar :avatarID=avatarID class="h-[190px] w-[190px]" />

                <ButtonRounded class="absolute top-full -translate-y-full left-1/2 -translate-x-1/2 ml-20 -mt-2 scale-110" @click=regenerateAvatar>
                    <img class="h-11 w-11" src="@/assets/icons/looped-arrow.svg" />
                </ButtonRounded>
            </div>

            <Text class="text-center mt-14"> Choisis un pseudo </Text>

            <div class="relative w-full pr-3 mt-4 flex justify-center">
                <input @focus=scrollToBottom @input=writingInput @keyup.enter=buttonClicked v-model=playerName type="text" placeholder="Player 123" class="bg-900 w-full border-4 color-100 border-100 p-3 pl-6 pr-6 text-size rounded-full shadow" spellcheck="false" autocomplete="false" maxlength="25" />
                <img class="h-8 absolute left-full top-1/2 -translate-x-full -translate-y-1/2 -ml-11 duration-300" :class="{ 'opacity-0': !displayInputWarning }" src="@/assets/icons/warning.svg" />
            </div>

            <div class="mt-8 flex justify-center">
                <ButtonClassic @click=buttonClicked> Jouer </ButtonClassic>
            </div>

            <div class="mt-20 cursor-pointer flex flex-row justify-center items-center gap-2" @click="$emit('seeRules')">
                <img class="h-10 w-10 -mt-1 border-3 border-100 rounded-full" src="@/assets/icons/information.svg" />
                <SmallHeader class="text-center -mt-2"> DECOUVRIR LE PRINCIPE </SmallHeader>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import router from '@/router/router';

    import { useGeneralStore } from '@/stores/general';

    import ButtonClassic from '@/ui/buttons/ButtonClassic.vue';
    import ButtonRounded from '@/ui/buttons/ButtonRounded.vue';

    import Avatar from '@/components/avatar/Avatar.vue';
    
    import Text from '@/ui/text/Text.vue';
    import SmallHeader from '@/ui/text/SmallHeader.vue';

    const { homeFormStep, avatarID, playerName, showMobile, avatarCount } = storeToRefs(useGeneralStore());

    const displayInputWarning = ref(false);

    function regenerateAvatar() {
        if(avatarID.value < avatarCount.value) avatarID.value += 1;
        else avatarID.value = 1;
    }

    function buttonClicked() {
        if(playerName.value.trim() == "") displayInputWarning.value = true;
        else {
            displayInputWarning.value = false;
            router.push('/mode');
        }
    }

    function writingInput() {
        if(playerName.value.trim() != "") displayInputWarning.value = false;
    }

    function scrollToBottom() {
        //@ts-ignore
        document.getElementById('app').firstElementChild.scroll({
            top: 1000,
            left: 0,
            behavior: 'smooth'
        }); 
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
</script>