<template>
    <div class="relative h-full w-[500px] border-r-4 border-100 box-content bg-accent duration-500 z-30" :class="{ 'left-0': hamburgerChecked, '-left-[504px]': !hamburgerChecked }">
        <div class="absolute top-1/2 -translate-y-1/2 h-2/3 w-full flex flex-col justify-around pl-10 pr-10">
            <router-link to="/" class="link color-900 text-size" :class="{ 'color-100': $route.name == 'homeSlide1' }"> VALADRI GAMES </router-link>
            <router-link to="" class="link color-900 text-size" :class="{ 'color-100': $route.name == '' }"> TWITTER </router-link>
            <router-link to="/settings/privacy" class="link color-900 text-size" :class="{ 'color-100': $route.name == 'privacyInformations' }"> UTILISATION DES DONNEES </router-link>
            <router-link to="" class="link color-900 text-size" :class="{ 'color-100': $route.name == '' }"> CONDITIONS D'UTILISATION </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { RouterLink } from 'vue-router';

    import { useGeneralStore } from '@/stores/general';

    const { hamburgerChecked } = storeToRefs(useGeneralStore());
</script>

<style scoped>
    .link {
        text-align: center;
        cursor: pointer;
    }
</style>