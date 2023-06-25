<template>
    <div class="absolute w-full h-full top-0 duration-500 bg-accent z-30 -left-full" :class="{ 'left-0': hamburgerChecked }">
        <div class="absolute top-1/2 -translate-y-1/2 h-2/3 w-full flex flex-col justify-around pl-10 pr-10">
            <router-link to="/" class="link color-900" :class="{ 'color-100': $route.name == 'homeSlide1' }"> JOUER </router-link>
            <router-link to="" class="link color-900" :class="{ 'color-100': $route.name == '' }"> TWITTER </router-link>
            <router-link to="/settings/privacy" class="link color-900" :class="{ 'color-100': $route.name == 'privacyInformations' }"> UTILISATION DES DONNEES </router-link>
            <router-link to="" class="link color-900" :class="{ 'color-100': $route.name == '' }"> CONDITIONS D'UTILISATION </router-link>
        </div>

        <!-- Log in -->
        <div v-if="!loggedIn" class="absolute left-0 top-full -translate-y-full w-full flex justify-center pb-8 gap-5">
            <router-link to="/create-account">
                <ButtonContent :secondOption="true" class="flex flex-row gap-3 items-center max-w-max !pl-6 !pr-6">
                    <Header> Crée un compte </Header>
                </ButtonContent>
            </router-link>

            <router-link to="/login">
                <ButtonContent :secondOption="true" class="flex flex-row gap-3 items-center max-w-max !pl-6 !pr-6">
                    <Header> Se connecter </Header>
                </ButtonContent>
            </router-link>
        </div>

        <!-- Account -->
        <router-link to="/settings/account">
            <div v-if="loggedIn" class="absolute left-0 top-full -translate-y-full w-full pl-6 pr-6 pb-4">
                <div class="flex flex-row bg-accent2 rounded-full p-2 pr-5 items-center">
                    <div class="flex-1 flex-row flex gap-4 items-center">
                        <Avatar :big="true" :shadow="false" :avatarID=avatarID class="w-16 h-16" />
                        <Text> {{ playerName }} </Text>
                    </div>

                    <hr class="rotate-90 bg-100 w-10 h-1 border-none" />

                    <div class="flex-row flex items-center">
                        <Text class="whitespace-nowrap"> Score total: {{ accountScore }} </Text>
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

    import ButtonContent from '@/ui/buttons/ButtonContent.vue';
    import Header from '@/ui/text/Text.vue';
    import Text from '@/ui/text/Text.vue';

    import Avatar from '@/components/avatar/Avatar.vue';

    const { hamburgerChecked, avatarID, loggedIn, playerName, accountScore } = storeToRefs(useGeneralStore());
</script>

<style scoped>
    .link {
        text-align: center;
        font-size: 2.5rem;
        line-height: 2.75rem;
        font-weight: bold;
        cursor: pointer;
    }
</style>