<template>
    <!-- Page viewer start -->
    <router-view v-slot="{ Component, route }">
        <transition :name=route.meta.transitionName>
            <component :is=Component :key=route.path />
        </transition>
    </router-view>
    <!-- Page viewer end -->
    <BottomMenu />
</template>

<script setup lang="ts">
    import { RouterView } from "vue-router";
</script>