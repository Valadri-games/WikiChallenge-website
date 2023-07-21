<template>
    <PopupBase :show="show">
        <div class="flex flex-col items-center overflow-auto">
            <Header class="text-center w-full mt-4"> Es-tu sûr de vouloir quitter la partie&nbsp;? </Header>

            <Text class="mt-8 text-center"> La partie en cours sera annulée. Tu ne pourras pas reprendre ta progression. </Text>
            <Text v-if="dailychallenge" class="mt-8 text-center"> Attention: tu ne pourra plus participer au défi d'aujourd'hui. </Text>

            <div class="pb-2 mt-8 mb-4 w-full flex flex-row gap-10 justify-center">
                <ButtonClassic class="!pl-10 !pr-10" @click="$emit('close')"> Rester </ButtonClassic>
                <ButtonClassic class="quit !pl-10 !pr-10" @click="$emit('quit')"> Quitter </ButtonClassic>
            </div>
        </div>
    </PopupBase>
</template>

<script setup lang="ts">
    import PopupBase from './PopupBase.vue';

    import ButtonClassic from '@/ui/buttons/ButtonClassic.vue';
    
    import Header from '@/ui/text/Header.vue';
    import Text from '@/ui/text/Text.vue';

    defineProps({
        show: Boolean,

        dailychallenge: {
            type: Boolean,
            required: false,
            default: false,
        }
    });
</script>

<style scoped>
    .quit {
        background-color: var(--color-900) !important;
    }
</style>