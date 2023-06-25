<template>
    <div class="button shadow" :class="{ 'bg-900': secondOption, 'bg-accent': !secondOption }">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
    defineProps({
        secondOption: {
            type: Boolean,
            required: false,
            default: false,
        }
    });
</script>

<style scoped>
    .button {
        border: 6px solid var(--color-100);
        border-radius: 9999px;
        padding: 1.25rem;
        cursor: pointer;
        user-select: none;
    }

    .button:active {
        box-shadow: 7px 7px 0px 1px var(--color-100);
        transform: translateY(5px);
    }

    .button:hover {
        background-color: var(--color-accent-1-darker);
    }

    @media screen and (max-width: 850px) {
        .button {
            border: 4px solid var(--color-100);
            padding: 0.75rem;
        }

        .button:active {
            box-shadow: 2px 2px 0px 1px var(--color-100);
            transform: translateY(2px);
        }
    }
</style>