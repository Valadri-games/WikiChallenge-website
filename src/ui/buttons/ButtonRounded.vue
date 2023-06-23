<template>
    <div class="button">
        <slot></slot>
    </div>
</template>

<style scoped>
    .button {
        background-color: var(--color-900);
        border-width: 6px;
        border-color: var(--color-100);
        border-radius: 9999px;
        padding: 1rem;
        cursor: pointer;
        user-select: none;
    }

    .button:active {
        scale: 0.96;
    }

    @media screen and (max-width: 850px) {
        .button {
            padding: 0.5rem;
            border-width: 4px;
        }
    }
</style>