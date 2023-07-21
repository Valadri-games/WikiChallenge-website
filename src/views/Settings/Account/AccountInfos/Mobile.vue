<template>
    <div class="absolute w-full h-full overflow-x-hidden flex flex-col duration-300 overflow-y-auto pb-52">
        <HamburgerMenu v-once />

        <div class="relative w-full flex justify-center items-center">
            <Header class="mt-8"> Mon compte </Header>
        </div>

        <hr class="mt-6 ml-10 mr-10 border-t-2 rounded-full border-100 opacity-30" />

        <div class="relative ml-8 mr-8 mt-8">
            <Avatar :avatarID=avatarid :smallShadow="true" :big="true" class="h-[80px] w-[80px]" />

            <Text class="ml-3 mt-3 scale-110 max-w-min"> {{ name }} </Text>
            <Text class="ml-2 opacity-75"> Joue depuis le {{ Utils.getDateText(joinDate, true) }} </Text>

            <router-link to="/settings/account/edit">
                <div class="absolute top-0 left-full -translate-x-full mt-1 flex flex-row pr-14 gap-6 items-center border-3 p-3 rounded-full border-100">
                    <img class="h-9 w-9" src="@/assets/icons/settings.svg" />
                    <Text> Modifier </Text>
                </div>
            </router-link>
        </div>

        <hr class="mt-8 ml-10 mr-10 border-t-2 rounded-full border-100 opacity-30" />

        <router-link to="/settings/account/stats">
            <div class="flex flex-col relative ml-8 mr-8 mt-8">
                <Header> Statistiques </Header>

                <div class="flex flex-row mt-4 gap-4">
                    <img src="@/assets/icons/clock.svg" />

                    <div class="flex flex-col flex-1">
                        <Text class="scale-110 max-w-min"> {{ todaygamecount }} </Text>
                        <Text class="opacity-75"> Parties aujourd'hui </Text>
                    </div>
                </div>

                <div class="flex flex-row mt-4 gap-4">
                    <img src="@/assets/icons/star.svg" />

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

        <hr class="mt-8 ml-10 mr-10 border-t-2 rounded-full border-100 opacity-30" />

        <router-link to="">
            <div class="flex flex-col relative ml-8 mr-8 mt-8 opacity-50 pointer-events-none">
                <Header> Réalisations </Header>

                <div class="absolute top-0 left-full -translate-x-full -ml-6 mt-1">
                    <img class="h-11 w-11 min-w-fit" src="@/assets/icons/medal.svg" />
                </div>
            </div>
        </router-link>

        <div class="fixed top-full left-1/2 -translate-x-1/2 -translate-y-full -mt-20 w-full flex flex-row gap-5 justify-center pr-2 bg-900 pt-5 pb-9">
            <ButtonClassic :smallPad="true" @click=logout class="whitespace-nowrap logout"> Se deconnecter </ButtonClassic>
            <ButtonClassic :smallPad="true" @click="router.push('/')" class="whitespace-nowrap pointer-events-none opacity-50"> Profil public </ButtonClassic>
        </div>

        <MobileMenu />
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';

    import router from '@/router/router';

    import { useAccountStore } from '@/stores/account';

    import HamburgerMenu from "@/components/menu/HamburgerMenu.vue";

    import Utils from '@/static/utils';

    import MobileMenu from '@/components/bottomMenu/MobileMenu.vue';

    import ButtonClassic from '@/ui/buttons/ButtonClassic.vue';

    import Avatar from '@/components/avatar/Avatar.vue';
    
    import Text from '@/ui/text/Text.vue';
    import Header from '@/ui/text/Header.vue';

    const accountStore = useAccountStore();
    const { avatarid, name, todaygamecount, todayscorecount, joinDate } = storeToRefs(accountStore);

    function logout() {
        accountStore.reset();
        router.push('/');
    }
</script>

<style scoped>
    .logout {
        background-color: var(--color-900) !important;
    }
</style>