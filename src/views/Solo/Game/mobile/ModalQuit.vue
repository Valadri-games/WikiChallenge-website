<template>
    <Transition name="modal">
        <div v-if="show" @click="$emit('close')" class="modal-mask">
            <div class="modal-container p-4 pr-5">
                <div class="m-auto max-h-full flex flex-col border-4 border-100 rounded-3xl p-6 bg-900 overflow-hidden shadow">
                    <Header class="text-center w-full">Es-tu sûr de vouloir quitter la partie&nbsp;?</Header>

                    <Text class="mt-8 text-center"> La partie en cours sera annulée. Tu ne pourras pas reprendre ta progression. </Text>

                    <div class="pb-2 mt-8 w-full flex flex-row gap-10 justify-center">
                        <ButtonClassic class="!pl-10 !pr-10" @click="$emit('close')"> Rester </ButtonClassic>
                        <ButtonClassic class="quit !pl-10 !pr-10" @click="quit"> Quitter </ButtonClassic>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
    import router from '@/router/router';
    
    import Header from '@/ui/text/Header.vue';
    import Text from '@/ui/text/Text.vue';

    import ButtonClassic from '@/ui/buttons/ButtonClassic.vue';

    const props = defineProps({
        show: Boolean,
    });

    function quit(event: any) {
        router.push('/solo');
        event.stopPropagation();
    }
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

    .quit {
        background-color: var(--color-900) !important;
    }
</style>