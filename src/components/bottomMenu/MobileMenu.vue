<template>
    <div class="fixed left-0 top-full -translate-y-full w-full pt-2 pb-2 flex flex-row bg-accent2">
        <router-link to="/" class="flex-1 flex justify-center items-center">
            <img class="h-16 w-16" src="@/assets/icons/play2.svg" />
        </router-link>

        <div @click="Leaderboards.loadGeneralLeaderboard" class="flex-1 flex justify-center items-center">
            <img class="h-16 w-16" src="@/assets/icons/stats2.svg" />
        </div>

        <router-link to="/settings/account" class="flex-1 flex justify-center items-center">
            <img class="h-12 w-12" src="@/assets/icons/account2.svg" />
        </router-link>
    </div>
</template>

<script setup lang="ts">
    import { RouterLink } from 'vue-router';

    import Leaderboards from '@/static/leaderboards';
</script>