<template>
    <PopupBase :show="show">
        <div class="flex flex-col items-center overflow-auto">
            <div class="flex flex-row gap-10 mt-4 justify-center items-center">
                <img class="h-16 w-16" src="@/assets/icons/pause.svg" />
                <Header> Partie en pause... </Header>
            </div>

            <Text class="mt-8 text-center"> Le temps ne défilera pas jusqu'à la reprise de la partie. Clique sur reprendre lorsque tu es prêt . </Text>

            <div class="pb-2 mt-8 mb-4 w-full flex justify-center">
                <ButtonClassic @click="$emit('close')"> Reprendre </ButtonClassic>
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
    });
</script>