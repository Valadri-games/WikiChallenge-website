<template>
    <div class="absolute w-full h-full overflow-hidden flex flex-col">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
            <img class="w-44 h-44 -mb-12" src="@/assets/animations/loader.svg" />
            <Header> Chargement </Header>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Header from '@/ui/text/Header.vue';
</script>