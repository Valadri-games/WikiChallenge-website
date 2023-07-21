<template>
    <div class="absolute w-full h-full top-0 duration-500 bg-accent z-30 -left-full" :class="{ 'left-0': hamburgerChecked }">
        <!-- Wiki -->
        <div class="absolute left-full -translate-x-full mt-6 -ml-8 flex-row flex gap-2 whitespace-nowrap items-center h-12 w-80 justify-end">
            <img v-if="!socketConnected" class="h-12 w-12 mr-2" src="@/assets/icons/wifi.svg" />

            <Text class="color-light"> Status: </Text>
            <Text v-if="socketConnected" class="!text-green-400"> Connecté </Text>
            <Text v-if="!socketConnected" class="!text-red-500"> Déconnecté </Text>
        </div>

        <div class="absolute top-1/2 -translate-y-1/2 h-2/3 w-full flex flex-col justify-around pl-10 pr-10">
            <!-- <router-link to="" class="link color-900" :class="{ 'color-100': $route.name == '' }"> TWITTER </router-link> -->
            <!-- <router-link to="/settings/privacy" class="link color-900" :class="{ 'color-100': $route.name == 'privacyInformations' }"> UTILISATION DES DONNEES </router-link> -->
            <a href="https://wikistatus.valentin-lelievre.com/" target="_blank" class="link color-900"> WIKI STATUS </a>
        </div>

        <!-- Log in -->
        <div v-if="!loggedIn" class="absolute left-0 top-full -translate-y-full w-full flex justify-center pb-8 gap-5">
            <router-link to="/create-account">
                <ButtonContent :secondOption="true" class="flex flex-row gap-3 items-center max-w-max !pl-6 !pr-6">
                    <Text> Crée un compte </Text>
                </ButtonContent>
            </router-link>

            <router-link to="/login">
                <ButtonContent :secondOption="true" class="flex flex-row gap-3 items-center max-w-max !pl-6 !pr-6">
                    <Text> Se connecter </Text>
                </ButtonContent>
            </router-link>
        </div>

        <!-- Account -->
        <router-link to="/settings/account">
            <div v-if="loggedIn" class="absolute left-1/2 top-full -translate-y-full -translate-x-1/2 w-full pl-6 pr-6 pb-6 overflow-hidden">
                <div class="flex flex-row bg-900 rounded-3xl p-3 pr-8 pl-4 items-center max-w-fit m-auto">
                    <div class="flex-1 flex-row flex gap-5 items-center overflow-hidden">
                        <div class="min-w-fit">
                            <Avatar :big="true" :smallShadow="true" :avatarID=avatarid class="w-20 h-20" />
                        </div>

                        <Text class="flex-1 scale-110 ml-1 whitespace-nowrap overflow-hidden text-ellipsis mr-2"> {{ name }} </Text>
                    </div>

                    <hr class="rotate-90 bg-100 w-16 h-1 border-none" />

                    <div class="flex flex-col">
                        <Text class="whitespace-nowrap"> {{ score }} </Text>
                        <Text class="whitespace-nowrap opacity-75"> XP Total </Text>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { RouterLink } from 'vue-router';

    import { useGeneralStore } from '@/stores/general';
    import { useAccountStore } from '@/stores/account';

    import ButtonContent from '@/ui/buttons/ButtonContent.vue';
    import Text from '@/ui/text/Text.vue';

    import Avatar from '@/components/avatar/Avatar.vue';
import { socketConnected } from '@/socket';

    const { hamburgerChecked } = storeToRefs(useGeneralStore());
    const { avatarid, loggedIn, name, score } = storeToRefs(useAccountStore());
</script>

<style scoped>
    .link {
        text-align: center;
        font-size: 2.5rem;
        line-height: 2.75rem;
        font-weight: bold;
        cursor: pointer;
    }

    .color-light {
        color: var(--color-900);
    }
</style>