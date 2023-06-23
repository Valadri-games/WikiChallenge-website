<template>
    <Transition name="modal">
        <div v-if="show" @click="$emit('close')" class="modal-mask">
            <div class="modal-container p-4 pr-5">
                <div class="m-auto max-h-full flex flex-col border-4 border-100 rounded-3xl p-5 bg-900 shadow">
                    <Header class="text-center w-full"> Partie en pause... </Header>

                    <Text class="mt-8 text-center"> Le temps ne défilera pas jusqu'à la reprise de la partie. Clique sur reprendre lorsque tu es prêt ! </Text>

                    <div class="pb-2 mt-8 w-full flex justify-center">
                        <ButtonClassic @click="$emit('close')"> Reprendre </ButtonClassic>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
    import ButtonClassic from '@/ui/buttons/ButtonClassic.vue';
    
    import Header from '@/ui/text/Header.vue';
    import Text from '@/ui/text/Text.vue';

    const props = defineProps({
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
        scale: 1.05;
        scale: 1.05;
    }
</style>