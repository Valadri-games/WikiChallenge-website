<template>
    <div class="absolute w-full h-full overflow-hidden flex flex-col duration-300">
        <div class="absolute mt-8 ml-8" @click="router.go(-1)">
            <img src="@/assets/icons/back-arrow.svg" class="h-10 w-10" />
        </div>

        <div class="w-full h-24 flex justify-center items-center flex-row gap-4 mt-1">
            <img src="@/assets/icons/settings.svg" class="h-10 w-10" />
            <Header> Paramètres </Header>
        </div>

        <hr class="mt-2 ml-10 mr-10 border-none h-0.5 rounded-full bg-100 opacity-25" />

        <div class="flex flex-col relative ml-8 mr-8 mt-8">
            <Text class="!scale-110 ml-8"> Changer d'avatar </Text>

            <div class="flex flex-row items-center mt-5 justify-center">
                <Avatar :avatarID=avatarid :smallShadow="true" :big="true" class="h-[120px] w-[120px]" />
                
                <ButtonRounded class="scale-110 ml-8" @click=regenerateAvatar>
                    <img class="h-11 w-11" src="@/assets/icons/looped-arrow.svg" />
                </ButtonRounded>
            </div>
        </div>

        <div class="fixed top-full left-1/2 -translate-x-1/2 -translate-y-full -mt-6 flex justify-center">
            <ButtonClassic @click="router.replace('/settings/account')" class="whitespace-nowrap"> Valider </ButtonClassic>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';

    import router from '@/router/router';

    import { useGeneralStore } from '@/stores/general';
    import { useAccountStore } from '@/stores/account';

    import ButtonClassic from '@/ui/buttons/ButtonClassic.vue';
    import ButtonRounded from '@/ui/buttons/ButtonRounded.vue';

    import Avatar from '@/components/avatar/Avatar.vue';
    
    import Text from '@/ui/text/Text.vue';
    import Header from '@/ui/text/Header.vue';

    const generalStore = useGeneralStore();
    const { avatarCount } = storeToRefs(generalStore);
    const { avatarid } = storeToRefs(useAccountStore());

    function regenerateAvatar() {
        if(avatarid.value < avatarCount.value) avatarid.value += 1;
        else avatarid.value = 1;
    }
</script>