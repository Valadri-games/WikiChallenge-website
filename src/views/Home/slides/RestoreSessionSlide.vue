<template>
    <div>
        <div class="h-slide" v-if="!showMobile">
            <Text> Restaurer la session précédente ? </Text>

            <ButtonClassic @click=generalStore.restore> Restaurer </ButtonClassic>
            <ButtonClassic @click=generalStore.reset> Recommencer </ButtonClassic>
        </div>

        <!-- Mobile -->
        <div class="absolute w-full duration-500" v-if="showMobile">
            <Header class="text-center mt-16"> Restaurer la session précédente ? </Header>

            <Text class="mt-12 text-justify w-full"> 
                Il semble que vous venez de quitter une session de jeu. Vous pouvez restaurer cette session pour reprendre 
                la où vous en étiez ou recommencer au début. 
            </Text>

            <div class="mt-12 pr-3 flex flex-col gap-5">
                <ButtonClassic @click=generalStore.restore> Reprendre </ButtonClassic>
                <ButtonClassic @click=generalStore.reset> Recommencer </ButtonClassic>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';

    import { useGeneralStore } from '@/stores/general';

    import ButtonClassic from '@/ui/buttons/ButtonClassic.vue';
    
    import Text from '@/ui/text/Text.vue';
    import Header from '@/ui/text/Header.vue';

    const generalStore = useGeneralStore();
    const { showMobile } = storeToRefs(generalStore);
</script>