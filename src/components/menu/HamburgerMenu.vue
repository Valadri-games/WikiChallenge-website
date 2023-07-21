<template>
    <div class="absolute left-0 top-0 mt-7 ml-7 z-40 h-10">
        <input id="top-menu-hamburger" type="checkbox" class="hidden" v-model="hamburgerChecked" />
        
        <label class="cursor-pointer" id="menu-label" for="top-menu-hamburger">
            <div v-for="i in 3" :key=i class="h-1.5 w-12 rounded-full duration-300" :class="{ 'mt-2': i != 0 }" :style="{ 'background-color': light ? 'var(--color-900)' : 'var(--color-100)' }"></div>
        </label>
    </div>
</template>

<script setup lang="ts">
    import { useGeneralStore } from '@/stores/general';
    import { storeToRefs } from 'pinia';

    const { hamburgerChecked } = storeToRefs(useGeneralStore());

    defineProps({
        light: {
            type: Boolean,
            required: false,
            default: false,
        }
    });
</script>

<style scoped>
    #menu-label div {
        transition: transform 0.2s, margin-top 0.2s linear 0.2s, opacity 0.2s linear 0.2s;
    }

    :checked + #menu-label div {
        transition: transform 0.2s linear 0.2s, margin-top 0.2s, opacity 0.2s;
    }

    :checked + #menu-label div:nth-child(1) {
        transform: rotate(-45deg);
        margin-top: 10px;
    }

    :checked + #menu-label div:nth-child(2) {
        opacity: 0;
        margin-top: -10px;
    }

    :checked + #menu-label div:nth-child(3) {
        transform: rotate(45deg);
        margin-top: 1.5px;
    }
</style>