<template>
    <div class="absolute w-full h-full overflow-hidden flex flex-col duration-300">
        <div class="absolute mt-8 ml-8" @click="router.go(-1)">
            <img src="@/assets/icons/back-arrow.svg" class="h-10 w-10" />
        </div>

        <div class="w-full h-24 flex justify-center items-center flex-row gap-4 mt-1">
            <img src="@/assets/icons/stats2.svg" class="h-10 w-10" />
            <Header> Statistiques </Header>
        </div>

        <hr class="mt-2 ml-10 mr-10 border-none h-0.5 rounded-full bg-100 opacity-25" />

        <div class="flex flex-col ml-4 mr-4 mt-8 gap-7">
            <Header> Aujourd'hui </Header>

            <div class="flex flex-row">
                <div class="flex flex-row gap-4 w-48">
                    <img class="w-12" src="@/assets/icons/clock.svg" />

                    <div class="flex flex-col flex-1">
                        <Text class="scale-110 ml-3"> {{ todaygamecount }} </Text>
                        <Text class="opacity-75"> Parties </Text>
                    </div>
                </div>

                <div class="flex flex-row gap-4 flex-1">
                    <img class="w-12" src="@/assets/icons/calendar.svg" />

                    <div class="flex flex-col flex-1">
                        <Text class="scale-110 ml-3"> 1e </Text>
                        <Text class="opacity-75"> Du défis quotidient </Text>
                    </div>
                </div>
            </div>

            <div class="flex flex-row">
                <div class="flex flex-row gap-4 w-48">
                    <img class="w-12" src="@/assets/icons/star.svg" />

                    <div class="flex flex-col flex-1">
                        <Text class="scale-110 ml-3"> {{ todayscorecount }} </Text>
                        <Text class="opacity-75"> XP </Text>
                    </div>
                </div>

                <div class="flex flex-row gap-4 flex-1">
                    <img class="w-12" src="@/assets/icons/target.svg" />

                    <div class="flex flex-col flex-1">
                        <Text class="scale-110 ml-3"> {{ streakdays }} jour </Text>
                        <Text class="opacity-75"> De suite </Text>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-col ml-4 mr-4 mt-16 gap-7">
            <Header> Depuis l'inscription </Header>

            <div class="flex flex-row">
                <div class="flex flex-row gap-4 w-48">
                    <img class="w-12" src="@/assets/icons/clock.svg" />

                    <div class="flex flex-col flex-1">
                        <Text class="scale-110 ml-3"> {{ gameplayed }} </Text>
                        <Text class="opacity-75"> Parties </Text>
                    </div>
                </div>

                <div class="flex flex-row gap-4 flex-1">
                    <img class="w-12" src="@/assets/icons/search.svg" />

                    <div class="flex flex-col flex-1">
                        <Text class="scale-110 ml-3"> {{ pagesseen }} </Text>
                        <Text class="opacity-75"> Page vues </Text>
                    </div>
                </div>
            </div>

            <div class="flex flex-row">
                <div class="flex flex-row gap-4 w-48">
                    <img class="w-12" src="@/assets/icons/star.svg" />

                    <div class="flex flex-col flex-1">
                        <Text class="scale-110 ml-3"> {{ score }} </Text>
                        <Text class="opacity-75"> XP total </Text>
                    </div>
                </div>

                <div class="flex flex-row gap-4 flex-1">
                    <img class="w-12" src="@/assets/icons/medal.svg" />

                    <div class="flex flex-col flex-1">
                        <Text class="scale-110 ml-3"> 1e </Text>
                        <Text class="opacity-75"> Du classement </Text>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';

    import router from '@/router/router';

    import { useAccountStore } from '@/stores/account';
    
    import Text from '@/ui/text/Text.vue';
    import Header from '@/ui/text/Header.vue';

    const { joinDate, todaygamecount, todayscorecount, score, gameplayed, pagesseen, streakdays } = storeToRefs(useAccountStore());
</script>