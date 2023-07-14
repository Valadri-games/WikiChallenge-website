<template>
    <div class="button shadow" :class="{ 'bg-900': secondOption, 'bg-accent': !secondOption, 'small-paddings': smallPad }">
        <p class="text-center color-100 text-size pointer-events-none"><slot></slot></p>
    </div>
</template>

<script setup lang="ts">
    defineProps({
        secondOption: {
            type: Boolean,
            required: false,
            default: false,
        },

        smallPad: {
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
        padding-left: 8rem;
        padding-right: 8rem;
        cursor: pointer;
        user-select: none;
    }

    .small-paddings {
        padding-left: 6rem !important;
        padding-right: 6rem !important;
    }

    .button:active {
        box-shadow: 3px 3px 0px 1px var(--color-100);
        transform: translateY(5px);
    }

    .button:hover {
        background-color: var(--color-accent-1-darker);
    }

    @media screen and (max-width: 850px) {
        .button {
            border: 4px solid var(--color-100);
            padding: 0.75rem;
            padding-left: 5rem;
            padding-right: 5rem;
        }
        
        .button:active {
            box-shadow: 2px 2px 0px 1px var(--color-100);
            transform: translateY(2px);
        }

        .small-paddings {
            padding-left: 2.5rem !important;
            padding-right: 2.5rem !important;
        }
    }
</style>