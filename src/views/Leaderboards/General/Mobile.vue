<template>
    <div class="absolute w-full h-full flex flex-col overflow-hidden">
        <div class="flex flex-col h-full mb-20">
            <div class="flex flex-row justify-center items-center ml-8 mr-8 mt-6 gap-20">
                <div class="min-w-fit" @click="router.go(-1)">
                    <img class="h-10 w-10 cursor-pointer" src="@/assets/icons/back-arrow.svg" />
                </div>

                <div class="flex flex-col">
                    <LargeHeader class="text-center color-100 mb-2"> Classement général </LargeHeader>

                    <Text v-if="orderBy == 0" class="text-center"> Par xp total </Text>
                    <Text v-if="orderBy == 1" class="text-center"> Par jour de suite </Text>
                    <Text v-if="orderBy == 2" class="text-center"> Par parties jouées </Text>
                    <Text v-if="orderBy == 3" class="text-center"> Par pages vues </Text>
                </div>

                <img class="h-14 w-14" src="@/assets/icons/stats2.svg" />
            </div>

            <div class="relative mt-5">
                <div class="flex flex-row pl-6 pr-6 gap-4">
                    <div v-for="(player, index) in leaderboardData[orderBy].slice(0, 3)" :class="{ 'order-1': index == 0 || index == 2 }" class="flex flex-col flex-1 gap-4 justify-end overflow-hidden">
                        <div class="flex flex-col gap-2 items-center">
                            <Avatar :avatarID=player.avatarid :shadow="false" :big="true" class="h-[70px] w-[70px]" />
                            <Text class="w-full overflow-hidden whitespace-nowrap text-ellipsis text-center"> {{ player.name }} </Text>
                        </div>

                        <div :class="{ 'h-48 bg-100': index == 0, 'h-40 bg-accent': index == 1, 'h-32 bg-accent2': index == 2 }" class="w-full rounded-t-2xl flex flex-col items-center pt-4 gap-1 pl-5 pr-5 text-center">
                            <Text :class="{ 'color-light': index == 0 || index == 1 }" class="scale-125 !font-medium"> {{ index + 1 }}{{ (index + 1 == 1 ? "er" : "e") }}  </Text>
                            
                            <Text v-if="orderBy == 0" :class="{ '!font-light color-light': index == 0 || index == 1, '!font-meduim': index == 2 }"> {{ player.score }} pts </Text>
                            <Text v-if="orderBy == 1" :class="{ '!font-light color-light': index == 0 || index == 1, '!font-meduim': index == 2 }"> {{ player.streakdays }} jour{{(player.streakdays > 1 ? "s" : "")}} </Text>
                            <Text v-if="orderBy == 2" :class="{ '!font-light color-light': index == 0 || index == 1, '!font-meduim': index == 2 }"> {{ player.gameplayed }} partie{{(player.gameplayed > 1 ? "s" : "")}} </Text>
                            <Text v-if="orderBy == 3" :class="{ '!font-light color-light': index == 0 || index == 1, '!font-meduim': index == 2 }"> {{ player.pagesseen }} page{{(player.pagesseen > 1 ? "s" : "")}} </Text>
                        </div>
                    </div>
                </div>

                <div v-if="leaderboardData[orderBy].length > 1" @click="changeOder" class="absolute top-0 left-full -translate-x-full -ml-8 z-20">
                    <img class="h-11 w-11 min-w-fit" src="@/assets/icons/double-arrow.svg" />
                </div>
            </div>

            <div class="flex-1 overflow-auto pb-6 relative">
                <div v-for="(player, index) in leaderboardData[orderBy].slice(3)" class="ml-6 mr-6">
                    <div>
                        <hr class="border-none h-0.5 rounded-full bg-100 opacity-25 mt-6 mb-6" />

                        <div class="flex flex-row gap-10">
                            <Text> {{ index + 4 }}e </Text>
                            <Text class="flex-1 whitespace-nowrap overflow-hidden text-ellipsis"> {{ player.name }} </Text>

                            <Text v-if="orderBy == 0"> {{ player.score }} pts </Text>
                            <Text v-if="orderBy == 1"> {{ player.streakdays }} jour{{(player.streakdays > 1 ? "s" : "")}} </Text>
                            <Text v-if="orderBy == 2"> {{ player.gameplayed }} partie{{(player.gameplayed > 1 ? "s" : "")}} </Text>
                            <Text v-if="orderBy == 3"> {{ player.pagesseen }} page{{(player.pagesseen > 1 ? "s" : "")}} </Text>
                        </div>
                    </div>
                </div>

                <div v-if="leaderboardData[orderBy].length < 4" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pl-10 pr-10">
                    <Text class="text-center"> Le classement est encore un peu vide. Reviens dans quelques temps pour qu'il puisse se remplir&nbsp;! </Text>
                </div>
            </div>

            <div v-if="loggedIn && leaderboardData[orderBy + 4][0].userrank > 100" class="border-100 border-t-4 border-l-4 border-r-4 -ml-2 -mr-2 rounded-t-3xl scale-x-100 p-6 pl-8 pr-8">
                <div class="flex flex-row gap-10">
                    <Text> {{ leaderboardData[orderBy + 4][0].userrank + 1 }}e </Text>
                    <Text class="flex-1 whitespace-nowrap overflow-hidden text-ellipsis"> {{ name }} </Text>

                    <Text v-if="orderBy == 0"> {{ leaderboardData[4][0].userscore }} pts </Text>
                    <Text v-if="orderBy == 1"> {{ leaderboardData[5][0].userstreakdays }} jour{{(leaderboardData[4][0].userstreakdays > 1 ? "s" : "")}} </Text>
                    <Text v-if="orderBy == 2"> {{ leaderboardData[6][0].usergameplayed }} partie{{(leaderboardData[5][0].usergameplayed > 1 ? "s" : "")}} </Text>
                    <Text v-if="orderBy == 3"> {{ leaderboardData[7][0].userpagesseen }} page{{(leaderboardData[5][0].userpagesseen > 1 ? "s" : "")}} </Text>
                </div>
            </div>
        </div>

        <!-- Bottom menu -->
        <transition name="fade">
            <MobileMenu v-if="loggedIn" />
        </transition>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { storeToRefs } from 'pinia';

    import router from '@/router/router';

    import { useAccountStore } from '@/stores/account';
    import { useGeneralStore } from '@/stores/general';

    import Avatar from '@/components/avatar/Avatar.vue';

    import MobileMenu from '@/components/bottomMenu/MobileMenu.vue';
    
    import LargeHeader from '@/ui/text/LargeHeader.vue';
    import Text from '@/ui/text/Text.vue';

    const orderBy = ref(0);

    function changeOder() {
        orderBy.value += 1;

        if(orderBy.value == 4) orderBy.value = 0;
    }

    const { leaderboardData } = storeToRefs(useGeneralStore());
    const { name, loggedIn } = storeToRefs(useAccountStore());
</script>

<style scoped>
    .color-light {
        color: var(--color-900) !important;
    }
</style>