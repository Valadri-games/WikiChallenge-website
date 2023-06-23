<template>
    <div class="relative rounded-full bg-900 border-100" :class="{ 'shadow': shadow, 'border-8': shadow }">
        <img v-if="win" class="w-full h-full scale-125 absolute top-0 left-0" src="@/assets/animations/confetti.svg" />
        <img v-if="win" class="w-full h-full absolute top-0 left-0 pt-8" :class="{ '!pt-2': big }" :src="'/public/img/avatars/avatar' + avatarID + '_crown.svg'" />
        
        <img v-if="!win" class="w-full h-full absolute top-0 left-0 pt-8" :class="{ '!pt-2': big }" :src="'/public/img/avatars/avatar' + avatarID + '.svg'" />
    </div>
</template>

<script setup lang="ts">
    defineProps({
        avatarID: {
            type: Number,
            required: true,
        },

        shadow: {
            type: Boolean,
            default: true,
            required: false,
        },

        win: {
            type: Boolean,
            default: false,
            required: false,
        },

        big: {
            type: Boolean,
            default: false,
            required: false,
        },
    });
</script>