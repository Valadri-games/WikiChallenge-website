<template>
    <div class="absolute w-full h-full overflow-x-hidden flex flex-col duration-300 overflow-y-auto pb-32">
        <div class="w-full h-24 flex justify-center items-center">
            <Header class="mt-1"> Mon compte </Header>
        </div>

        <hr class="mt-2 ml-10 mr-10 border-none h-0.5 rounded-full bg-100 opacity-25" />

        <div class="relative ml-8 mr-8 mt-8">
            <Avatar :avatarID=avatarID :smallShadow="true" :big="true" class="h-[80px] w-[80px]" />

            <Text class="ml-7 mt-3 scale-110"> {{ playerName }} </Text>
            <Text class="ml-2 opacity-75"> Joue depuis le {{ playSince }} </Text>

            <router-link to="/settings/account/edit">
                <div class="absolute top-0 left-full -translate-x-full mt-1 flex flex-row pr-14 gap-6 items-center border-3 p-3 rounded-full border-100">
                    <img class="h-9 w-9" src="@/assets/icons/settings.svg" />
                    <Text> Modifier </Text>
                </div>
            </router-link>
        </div>

        <hr class="mt-8 ml-10 mr-10 border-none h-0.5 rounded-full bg-100 opacity-25" />

        <router-link to="/settings/account">
            <div class="flex flex-col relative ml-8 mr-8 mt-8">
                <Header> Statistiques </Header>

                <div class="flex flex-row mt-4 gap-4">
                    <img src="@/assets/icons/clock.svg" />

                    <div class="flex flex-col flex-1">
                        <Text class="scale-110 ml-3"> {{ todayStats.gamePlayed }} </Text>
                        <Text class="opacity-75"> Parties aujourd'hui </Text>
                    </div>
                </div>

                <div class="flex flex-row mt-4 gap-4">
                    <img src="@/assets/icons/star.svg" />

                    <div class="flex flex-col flex-1">
                        <Text class="scale-110 ml-3"> {{ todayStats.score }} </Text>
                        <Text class="opacity-75"> XP du jour </Text>
                    </div>
                </div>

                <div class="absolute top-0 left-full -translate-x-full -ml-6 mt-1">
                    <img class="h-11 w-11 min-w-fit" src="@/assets/icons/stats.svg" />
                </div>
            </div>
        </router-link>

        <hr class="mt-8 ml-10 mr-10 border-none h-0.5 rounded-full bg-100 opacity-25" />

        <router-link to="">
            <div class="flex flex-col relative ml-8 mr-8 mt-8 opacity-50 pointer-events-none">
                <Header> Réalisations </Header>

                <div class="absolute top-0 left-full -translate-x-full -ml-6 mt-1">
                    <img class="h-11 w-11 min-w-fit" src="@/assets/icons/medal.svg" />
                </div>
            </div>
        </router-link>

        <div class="fixed top-full left-1/2 -translate-x-1/2 -translate-y-full -mt-6 w-full flex flex-row gap-7 justify-center">
            <ButtonClassic :smallPad="true" @click="router.push('/')" class="whitespace-nowrap"> Jouer </ButtonClassic>
            <ButtonClassic :smallPad="true" @click=selfLogout class="whitespace-nowrap logout"> Se deconnecter </ButtonClassic>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';

    import { ref } from 'vue';

    import router from '@/router/router';

    import { useGeneralStore } from '@/stores/general';

    import ButtonClassic from '@/ui/buttons/ButtonClassic.vue';

    import Avatar from '@/components/avatar/Avatar.vue';
    
    import Text from '@/ui/text/Text.vue';
    import Header from '@/ui/text/Header.vue';

    const generalStore = useGeneralStore();
    const { avatarID, playerName, todayStats, joinDate } = storeToRefs(generalStore);

    const playSince = ref("");
    let d1 = new Date(joinDate.value);
    let monthName = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin","Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    let d = d1.getDate();
    let m = d1.getMonth();
    let y = d1.getFullYear();
    playSince.value = d + " " + monthName[m] + " " + y;

    function selfLogout() {
        generalStore.logout();
        router.push('/');
    }
</script>

<style scoped>
    .logout {
        background-color: var(--color-900) !important;
    }
</style>