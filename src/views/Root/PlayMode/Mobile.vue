<template>
    <div class="absolute w-full h-full duration-500">
        <Header class="text-center mt-3"> MODE DE JEU </Header>

        <Text class="text-center mt-16">
            Amuse-toi en affrontant tes ami.e.s dans un salon privé et en personnalisant ta partie&nbsp;! 
        </Text>

        <div class="mt-4 flex justify-center pointer-events-none opacity-50">
            <router-link to="/mode-2">
                <ButtonContent class="flex flex-row items-center text-center w-[220px]">
                    <img class="h-10 w-10" src="@/assets/icons/play-multi2.svg" />
                    <Text class="flex-1 pointer-events-none"> Multijoueur </Text>
                </ButtonContent>
            </router-link>
        </div>

        <Text class="text-center mt-20">
            Créer une partie solo personnalisée ou réalise le meilleure temps ou le plus court chemin du défi quotidien&nbsp;!
        </Text>

        <div class="mt-4 flex justify-center">
            <router-link to="/solo">
                <ButtonContent class="flex flex-row items-center text-center w-[220px]">
                    <img class="h-10 w-10" src="@/assets/icons/play-solo2.svg" />
                    <Text class="flex-1 pointer-events-none"> Jouer solo </Text>
                </ButtonContent>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
    import ButtonContent from '@/ui/buttons/ButtonContent.vue';
    
    import Header from '@/ui/text/Header.vue';
    import Text from '@/ui/text/Text.vue';
</script>