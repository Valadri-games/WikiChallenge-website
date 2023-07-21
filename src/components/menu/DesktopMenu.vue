<template>
    <div class="relative h-full w-[500px] border-r-4 border-100 box-content bg-accent duration-500 z-30" :class="{ 'left-0': hamburgerChecked, '-left-[504px]': !hamburgerChecked }">
        <div class="absolute top-1/2 -translate-y-1/2 h-2/3 w-full flex flex-col justify-around pl-10 pr-10">
            <!-- <router-link to="/" class="link color-900 text-size" :class="{ 'color-100': $route.name == 'homeSlide1' }"> VALADRI GAMES </router-link>
            <router-link to="" class="link color-900 text-size" :class="{ 'color-100': $route.name == '' }"> TWITTER </router-link>
            <router-link to="/settings/privacy" class="link color-900 text-size" :class="{ 'color-100': $route.name == 'privacyInformations' }"> UTILISATION DES DONNEES </router-link>
            <router-link to="" class="link color-900 text-size" :class="{ 'color-100': $route.name == '' }"> CONDITIONS D'UTILISATION </router-link> -->

            <a href="https://wikistatus.valentin-lelievre.com/" target="_blank" class="link color-900 text-size"> WIKI STATUS </a>
        </div>

        <!-- Log in -->
        <div v-if="!loggedIn" class="absolute left-0 top-full -translate-y-full w-full flex flex-row justify-center pb-8 gap-12 pl-8 pr-8">
            <router-link to="/create-account">
                <ButtonContent :secondOption="true" class="flex-1 flex flex-row items-center !pl-8 !pr-8">
                    <Text class="whitespace-nowrap !text-4xl"> Crée un compte </Text>
                </ButtonContent>
            </router-link>

            <router-link to="/login">
                <ButtonContent :secondOption="true" class="flex-1 flex flex-row items-center !pl-8 !pr-8">
                    <Text class="whitespace-nowrap !text-4xl"> Se connecter </Text>
                </ButtonContent>
            </router-link>
        </div>

        <!-- Account -->
        <router-link to="/settings/account">
            <div v-if="loggedIn" class="absolute left-1/2 top-full -translate-y-full -translate-x-1/2 pl-8 pr-8 pb-8">
                <div class="flex flex-row bg-900 rounded-3xl p-4 pr-8 pl-4 items-center">
                    <div class="flex-1 flex-row flex gap-6 items-center">
                        <Avatar :big="true" :smallShadow="true" :avatarID=avatarid class="w-32 h-32" />
                        <Text class="ml-1"> {{ name }} </Text>
                    </div>

                    <hr class="rotate-90 bg-100 w-16 h-1 border-none" />

                    <div class="flex flex-col">
                        <Text class="whitespace-nowrap"> {{ score }} </Text>
                        <Text class="whitespace-nowrap opacity-75 !text-3xl"> XP Total </Text>
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

    import Avatar from '@/components/avatar/Avatar.vue';

    import ButtonContent from '@/ui/buttons/ButtonContent.vue';
    import Text from '@/ui/text/Text.vue';

    const { hamburgerChecked } = storeToRefs(useGeneralStore());

    const { avatarid, loggedIn, name, score } = storeToRefs(useAccountStore());
</script>

<style scoped>
    .link {
        text-align: center;
        cursor: pointer;
    }
</style>