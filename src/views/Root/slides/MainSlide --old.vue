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
                        <Avatar :avatarID=avatarid class="w-96 h-96" />

                        <div class="absolute top-full -translate-y-full -ml-56">
                            <ButtonRounded @click=Utils.regenerateAvatar>
                                <img class="m-auto h-20 w-20" src="@/assets/icons/looped-arrow.svg" />
                            </ButtonRounded>
                        </div>
                    </div>

                    <div class="mt-20 flex flex-col items-center pb-3">
                        <Text class="w-[500px] !font-bold"> Choisis un pseudo </Text>
                        
                        <div class="relative mt-4">
                            <input @input=writingInput @keyup.enter=buttonClicked v-model=name type="text" placeholder="Joueur 123" class="bg-900 color-100 border-6 w-[500px] border-100 p-5 pl-10 pr-10 text-size rounded-full shadow outline-none" spellcheck="false" autocomplete="false" maxlength="25"  />
                            <img class="h-14 absolute left-full top-1/2 -translate-x-full -translate-y-1/2 -ml-12 duration-500" :class="{ 'opacity-0': !displayInputWarning }" src="@/assets/icons/warning.svg" />
                        </div>

                        <ButtonClassic class="mt-14" @click=buttonClicked> Jouer </ButtonClassic>
                    </div>
                </div>
            </div>
            <!-- Rigft flex end -->
        </div>

        <!-- Mobile --> 
        <div class="absolute w-full duration-500" v-if="showMobile">
            <!-- New user --> 
            <div v-if="!loggedIn">
                <div class="relative w-full flex justify-center mt-4">
                    <Avatar :avatarID=avatarid class="h-[190px] w-[190px]" />

                    <ButtonRounded class="absolute top-full -translate-y-full left-1/2 -translate-x-1/2 ml-20 -mt-2 scale-110" @click=Utils.regenerateAvatar>
                        <img class="h-11 w-11" src="@/assets/icons/looped-arrow.svg" />
                    </ButtonRounded>
                </div>

                <Text class="text-center mt-14"> Choisis un pseudo </Text>

                <div class="relative w-full pr-3 mt-4 flex justify-center">
                    <input @focus=Utils.scrollToBottom @input=writingInput @keyup.enter=buttonClicked v-model=name type="text" placeholder="Player 123" class="bg-900 w-full border-4 color-100 border-100 p-3 pl-6 pr-6 text-size rounded-full shadow" spellcheck="false" autocomplete="false" maxlength="25" />
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

            <!-- Logged in --> 
            <div v-if="loggedIn && freshDataLoaded">
                <div class="relative">
                    <router-link to="/settings/account">
                        <Avatar :avatarID=avatarid :smallShadow="true" :big="true" class="h-[80px] w-[80px]" />

                        <Text class="ml-6 mt-3 scale-110"> {{ name }} </Text>
                        <Text class="ml-2 opacity-75"> Joue depuis {{ playSince }} </Text>
                    </router-link>

                    <router-link to="/settings/account/edit">
                        <div class="absolute top-0 left-full -translate-x-full -ml-6 mt-1">
                            <img class="h-11 w-11 min-w-fit" src="@/assets/icons/settings.svg" />
                        </div>
                    </router-link>
                </div>

                <hr class="mt-5 mb-5 border-t-2 rounded-full border-100 opacity-30" />

                <router-link to="/settings/account/stats">
                    <div class="flex flex-col relative">
                        <Header> Statistiques </Header>

                        <div class="flex flex-row mt-4 gap-4">
                            <img class="w-12" src="@/assets/icons/clock.svg" />

                            <div class="flex flex-col flex-1">
                                <Text class="scale-110 max-w-min"> {{ todaygamecount }} </Text>
                                <Text class="opacity-75"> Parties aujourd'hui </Text>
                            </div>
                        </div>

                        <div class="flex flex-row mt-4 gap-4">
                            <img class="w-12" src="@/assets/icons/star.svg" />

                            <div class="flex flex-col flex-1">
                                <Text class="scale-110 max-w-min"> {{ todayscorecount }} </Text>
                                <Text class="opacity-75"> XP du jour </Text>
                            </div>
                        </div>

                        <div class="absolute top-0 left-full -translate-x-full -ml-6 mt-1">
                            <img class="h-11 w-11 min-w-fit" src="@/assets/icons/stats.svg" />
                        </div>
                    </div>
                </router-link>

                <hr class="mt-5 mb-5 border-t-2 rounded-full border-100 opacity-30" />

                <div v-if="!dailychallengedone" class="flex flex-col relative" @click=SoloMode.playDailyChallenge>
                    <Header> Défi quotidien </Header>
                    <Text class="mt-4 opacity-75 scale-90 -ml-4"> Il te reste <span class="font-bold">{{ Utils.convertMsToDuration(Utils.getTimeToTomorrow()) }}</span> pour participer </Text>

                    <div class="absolute top-0 left-full -translate-x-full -ml-6 mt-1">
                        <img class="h-11 w-11 min-w-fit" src="@/assets/icons/play.svg" />
                    </div>
                </div>

                <div v-if="dailychallengedone" class="relative">
                    <div class="flex flex-col" @click=SoloMode.playDailyChallenge>
                        <Header> Défi quotidien </Header>
                        <Text class="mt-4 opacity-75 scale-90 -ml-4"> Ton score aujourd'hui: <span class="font-bold">{{ dailychallengescore }}</span> </Text>
                    </div>

                    <div @click="Leaderboards.loadDailyChallengeLeaderboard" class="absolute top-0 left-full -translate-x-full mt-1 flex items-center -ml-5 justify-center w-18 h-18">
                        <img class="h-11 w-11 min-w-fit" src="@/assets/icons/stats.svg" />
                    </div>
                </div>

                <div class="mt-7 flex justify-center">
                    <ButtonClassic @click=buttonClicked> Jouer </ButtonClassic>
                </div>
            </div>

            <!-- Logged in --> 
            <div v-if="loggedIn && !freshDataLoaded">
                <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
                    <img class="w-28 h-28 -mb-6" src="@/assets/animations/loader.svg" />
                    <Text class="text-center"> Chargement du ton compte </Text>
                </div>
            </div>

            <Teleport to="body">
                <NotConnected :show="showConnectionErrorPopup" @close="showConnectionErrorPopup = false"></NotConnected>
            </Teleport>

            <Teleport to="body">
                <ModalTextContent :button="'OK'" :title="'Communication interrompu'" :show="showDownloadUserDataError" @close="showDownloadUserDataError = false">
                    Un problème de communication avec le serveur est servenu. <br /><br />Les données de ton compte n'ont pas pu être chargées. Vérifie ta connexion et réessaie de te connecter.
                </ModalTextContent>
            </Teleport>

            <Teleport to="body">
                <ModalTextContent :button="'OK'" :title="'Echec du chargement des données'" :show="showServerError" @close="showServerError = false">
                    Une erreur est survenue lors du chargement. Veuillez réessayer dans quelques secondes.
                </ModalTextContent>
            </Teleport>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue';
    import { storeToRefs } from 'pinia';

    import router from '@/router/router';

    import { socket } from '@/socket';

    import { useGeneralStore } from '@/stores/general';
    import { useAccountStore } from '@/stores/account';

    import Utils from '@/static/utils';
    import SoloMode from '@/static/soloMode';
    import Leaderboards from '@/static/leaderboards';

    import NotConnected from '@/components/popup/NotConnected.vue';
    import ModalTextContent from '@/components/popup/BasicTextContent.vue';

    import ButtonClassic from '@/ui/buttons/ButtonClassic.vue';
    import ButtonRounded from '@/ui/buttons/ButtonRounded.vue';

    import Avatar from '@/components/avatar/Avatar.vue';
    
    import Text from '@/ui/text/Text.vue';
    import Header from '@/ui/text/Header.vue';
    import SmallHeader from '@/ui/text/SmallHeader.vue';

    const { homeFormStep, showMobile, minimumToRestore, internetAvailable, showDownloadUserDataError, showServerError } = storeToRefs(useGeneralStore());
    const { avatarid, name, loggedIn, joinDate, todaygamecount, todayscorecount, freshDataLoaded, dailychallengedone, dailychallengescore } = storeToRefs(useAccountStore());

    const displayInputWarning = ref(false);
    const showConnectionErrorPopup = ref(false);

    const playSince = ref(Utils.getDateText(joinDate.value));

    function buttonClicked() {
        if(internetAvailable.value && socket.connected) {
            if(name.value.trim() == "") displayInputWarning.value = true;
            else {
                displayInputWarning.value = false;
                router.push('/mode');
            }
        } else showConnectionErrorPopup.value = true;
    }

    function writingInput() {
        if(name.value.trim() != "") displayInputWarning.value = false;
    }

    onMounted(() => {
        minimumToRestore.value = false;

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