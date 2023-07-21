<template>
    <div class="absolute w-full duration-500">
        <Header class="text-center mt-20"> Tu es sur le point de perdre ta progression&nbsp;! </Header>

        <Text class="mt-16 text-center w-full"> 
            Il semblerait que tu ai quitté ta session de jeu précédente... 
        </Text>

        <Text class="mt-8 text-center w-full"> 
            Veux-tu reprendre ou recommencer ?
        </Text>

        <div class="mt-16 pr-3 flex flex-col gap-8 items-center">
            <ButtonClassic @click=generalStore.restore> Reprendre </ButtonClassic>
            <ButtonClassic :second-option="true" @click=generalStore.reset> Recommencer </ButtonClassic>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useGeneralStore } from '@/stores/general';

    import ButtonClassic from '@/ui/buttons/ButtonClassic.vue';
    
    import Text from '@/ui/text/Text.vue';
    import Header from '@/ui/text/Header.vue';

    const generalStore = useGeneralStore();
</script>