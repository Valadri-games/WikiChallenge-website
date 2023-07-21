<template>
    <div class="absolute w-full h-full flex flex-col overflow-hidden">
        <div class="flex flex-col h-full mb-20">
            <div class="flex flex-row justify-center items-center ml-8 mr-8 mt-6 gap-20">
                <div @click="router.go(-1)">
                    <img class="h-10 w-10 cursor-pointer" src="@/assets/icons/back-arrow.svg" />
                </div>

                <div class="flex flex-col">
                    <LargeHeader class="text-center color-100"> Classement </LargeHeader>
                    <Text class="text-center"> {{ Utils.getDateText(Date.now(), true) }} </Text>
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

                        <div :class="{ 'h-44 bg-100': index == 0, 'h-32 bg-accent': index == 1, 'h-24 bg-accent2': index == 2 }" class="w-full rounded-t-2xl flex flex-col items-center pt-4 gap-1 pl-5 pr-5">
                            <Text :class="{ 'color-light': index == 0 || index == 1 }" class="scale-125 !font-medium"> {{ index + 1 }}{{ (index + 1 == 1 ? "er" : "e") }}  </Text>
                            
                            <Text v-if="orderBy == 0" :class="{ '!font-light color-light': index == 0 || index == 1, '!font-meduim': index == 2 }"> {{ player.score }} pts </Text>
                            <Text v-if="orderBy == 1" :class="{ '!font-light color-light': index == 0 || index == 1, '!font-meduim': index == 2 }"> {{ player.pathlength }} clics </Text>
                            <Text v-if="orderBy == 2" :class="{ '!font-light color-light': index == 0 || index == 1, '!font-meduim': index == 2 }"> {{ Utils.convertMsToTime(player.totaltime) }} </Text>
                        </div>
                    </div>
                </div>

                <div v-if="leaderboardData[orderBy].length > 0" @click="changeOder" class="absolute top-0 left-full -translate-x-full -ml-8 mt-3 z-20">
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
                            <Text v-if="orderBy == 1"> {{ player.pathlength }} clics </Text>
                            <Text v-if="orderBy == 2"> {{ Utils.convertMsToTime(player.totaltime) }} </Text>
                        </div>
                    </div>
                </div>

                <div v-if="leaderboardData[orderBy].length < 4" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pl-10 pr-10">
                    <Text class="text-center"> Le classement est encore un peu vide. Reviens dans quelques temps pour qu'il puisse se remplir&nbsp;! </Text>
                </div>
            </div>

            <div v-if="leaderboardData[orderBy + 3] && leaderboardData[orderBy + 3][0].userrank > 20 && loggedIn" class="border-100 border-t-4 border-l-4 border-r-4 -ml-2 -mr-2 rounded-t-3xl scale-x-100 p-6 pl-8 pr-8">
                <div class="flex flex-row gap-10">
                    <Text> {{ leaderboardData[orderBy + 3][0].userrank + 1 }}e </Text>
                    <Text class="flex-1 whitespace-nowrap overflow-hidden text-ellipsis"> {{ name }} </Text>

                    <Text v-if="orderBy == 0"> {{ leaderboardData[3][0].userscore }} pts </Text>
                    <Text v-if="orderBy == 1"> {{ leaderboardData[4][0].userpathlength }} clics </Text>
                    <Text v-if="orderBy == 2"> {{ Utils.convertMsToTime(leaderboardData[5][0].usertotaltime) }} </Text>
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

    import Utils from '@/static/utils';

    const orderBy = ref(0);

    function changeOder() {
        orderBy.value += 1;

        if(orderBy.value == 3) orderBy.value = 0;
    }

    const { leaderboardData } = storeToRefs(useGeneralStore());
    const { name, loggedIn } = storeToRefs(useAccountStore());

</script>

<style scoped>
    .color-light {
        color: var(--color-900) !important;
    }
</style>