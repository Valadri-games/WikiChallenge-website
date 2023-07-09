<template>
    <div>
        <!-- Mobile --> 
        <div class="absolute w-full duration-500" v-if="showMobile">
            <Header class="w-full text-center mt-3"> Inscrit-toi </Header>

            <Text class="text-center mt-14">
                Envie de devenir le meilleur en faisant grimper ton XP&nbsp;? 
                D'obtenir des statistiques sur ton profil&nbsp;?
            </Text>

            <Text class="text-center mt-16">
                Crée un compte dès maintenant !
            </Text>

            <div class="mt-4 flex justify-center">
                <router-link to="/create-account">
                    <ButtonClassic :smallPad="true">Crée&nbsp;un&nbsp;compte</ButtonClassic>
                </router-link>
            </div>

            <Text class="text-center mt-16">
                Déja un compte ?
            </Text>

            <div class="mt-4 flex justify-center">
                <router-link to="/login">
                    <ButtonClassic :secondOption="true"> Se connecter </ButtonClassic>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';
    import { storeToRefs } from 'pinia';
    import router from '@/router/router';

    import { useGeneralStore } from '@/stores/general';

    import Header from '@/ui/text/Header.vue';
    import Text from '@/ui/text/Text.vue';

    import ButtonClassic from '@/ui/buttons/ButtonClassic.vue';

    const { homeFormStep, showMobile, loggedIn } = storeToRefs(useGeneralStore());

    onMounted(() => {
        homeFormStep.value = -1;
    });

    if(loggedIn.value == true) {
        router.push("/settings/account/");
    }
</script>