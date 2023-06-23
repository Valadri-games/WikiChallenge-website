<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask">
            <div class="modal-container p-4">
                <div class="m-auto">
                    <img v-if="!loading" src="@/assets/animations/pret_go.svg" class="w-96 h-96" />
                </div>

                <div class="absolute top-full left-1/2 -translate-x-1/2 -translate-y-full -mt-12">
                    <Header v-if="loading"> Chargement </Header>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
    import Header from '@/ui/text/Header.vue';

    const props = defineProps({
        show: Boolean,
        loading: Boolean,
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
        background-color: rgba(255, 255, 255, 0.2);
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
        scale: 1.05;
        scale: 1.05;
    }
</style>