<template>
    <div class="absolute w-full duration-500">
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

        <Teleport to="body">
            <NotConnected :show="showConnectionErrorPopup" @close="showConnectionErrorPopup = false"></NotConnected>
        </Teleport>

        <Teleport to="body">
            <ModalTextContent :button="'OK'" :title="'Echec du chargement des données'" :show="showServerError" @close="showServerError = false">
                Une erreur est survenue lors du chargement. Veuillez réessayer dans quelques secondes.
            </ModalTextContent>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
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

    import Avatar from '@/components/avatar/Avatar.vue';
    
    import Text from '@/ui/text/Text.vue';
    import Header from '@/ui/text/Header.vue';

    const { internetAvailable, showServerError } = storeToRefs(useGeneralStore());
    const { avatarid, name, joinDate, todaygamecount, todayscorecount, dailychallengedone, dailychallengescore } = storeToRefs(useAccountStore());

    const showConnectionErrorPopup = ref(false);

    const playSince = ref(Utils.getDateText(joinDate.value));

    function buttonClicked() {
        if(internetAvailable.value && socket.connected) router.push('/mode');
        else showConnectionErrorPopup.value = true;
    }
</script>