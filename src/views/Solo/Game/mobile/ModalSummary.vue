<template>
    <Transition name="modal">
        <div v-if="show" @click="$emit('close')" class="modal-mask">
            <div class="modal-container p-4 pr-5">
                <div class="m-auto max-h-full flex flex-col border-4 border-100 shadow rounded-3xl p-5 bg-900 overflow-x-hidden">
                    <div class="text-center">
                        <Text>
                            {{ endPage.replaceAll('_', ' ') }}
                        </Text>
                    </div>

                    <div class="flex-1 overflow-y-auto pb-1 pt-1 rounded-2xl mt-5 text-justify">
                        <Text> 
                            {{ endPageSummary }}
                        </Text>
                    </div>

                    <div class="pb-2 mt-8 w-full flex justify-center">
                        <ButtonClassic @click="$emit('close')"> Fermer </ButtonClassic>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';

    import { useSoloModeStore } from '@/stores/soloMode';

    import Text from '@/ui/text/Text.vue';

    import ButtonClassic from '@/ui/buttons/ButtonClassic.vue';

    const { endPage, endPageSummary } = storeToRefs(useSoloModeStore());

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