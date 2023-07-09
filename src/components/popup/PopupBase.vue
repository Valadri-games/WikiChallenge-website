<template>
    <transition name="modal">
        <div v-if="show" class="modal-mask">
            <div class="modal-container p-4 pr-5">
                <div @click="$emit('close')" class="absolute top-0 left-0 h-full w-full"></div>

                <div class="relative m-auto max-h-full flex border-4 border-100 rounded-3xl p-5 bg-900 shadow overflow-hidden">
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
    defineProps({
        show: Boolean,
    });
</script>

<style>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(3px);
        transition: opacity 0.4s ease;
        overflow: hidden;
    }

    .modal-container {
        height: 100%;
        width: 100%;
        transition: all 0.4s ease;
        display: flex;
        overflow: hidden;
    }

    .modal-enter-from, .modal-leave-to {
        opacity: 0;
    }

    .modal-enter-from .modal-container, .modal-leave-to .modal-container {
        scale: 1.01;
        scale: 1.01;
    }
</style>