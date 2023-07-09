<template>
    <PopupBase :show="show">
        <div class="flex flex-col items-center overflow-auto">
            <div class="flex flex-row gap-10 mt-10 justify-center items-center">
                <img class="h-16 w-16" src="@/assets/icons/server.svg" />
                <Header> Une erreur <br /> s'est produite </Header>
            </div>

            <Text class="mt-8 text-center"> Une erreur s'est produite lors de la communication avec le serveur. Veuillez réessayer dans quelques secondes. </Text>

            <div class="pb-2 mt-8 w-full flex justify-center">
                <ButtonClassic @click="$emit('close')"> Réessayer </ButtonClassic>
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