<template>
    <PopupBase :show="show">
        <div class="flex flex-col items-center overflow-auto">
            <div class="flex flex-row gap-10 mt-4 justify-center items-center">
                <img class="h-16 w-16" src="@/assets/icons/wifi.svg" />
                <Header> Erreur de <br /> connexion </Header>
            </div>

            <Text v-if="!internetAvailable" class="mt-8 text-center"> Tu n'es pas connecté à internet. Vérifie ta connection et réessaie </Text>
            <Text v-else class="mt-8 text-center"> Les serveurs du jeu sont actuellement indisponible. Réessaie dans quelques secondes. </Text>

            <div class="pb-2 mt-8 mb-4 w-full flex justify-center">
                <ButtonClassic @click="$emit('close')"> Réessayer </ButtonClassic>
            </div>
        </div>
    </PopupBase>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';

    import { useGeneralStore } from '@/stores/general';

    import PopupBase from './PopupBase.vue';

    import ButtonClassic from '@/ui/buttons/ButtonClassic.vue';
    
    import Header from '@/ui/text/Header.vue';
    import Text from '@/ui/text/Text.vue';

    defineProps({
        show: Boolean,
    });

    const { internetAvailable } = storeToRefs(useGeneralStore());
</script>