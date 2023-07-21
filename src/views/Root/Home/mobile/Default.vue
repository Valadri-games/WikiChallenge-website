<template>
    <div class="absolute w-full duration-500">
        <div class="relative w-full flex justify-center mt-4">
            <Avatar :avatarID=avatarid class="h-[190px] w-[190px]" />

            <ButtonRounded class="absolute top-full -translate-y-full left-1/2 -translate-x-1/2 ml-20 -mt-2 scale-110" @click=Utils.regenerateAvatar>
                <img class="h-11 w-11" src="@/assets/icons/looped-arrow.svg" />
            </ButtonRounded>
        </div>

        <Text class="text-center mt-14"> Choisis un pseudo </Text>

        <div class="relative w-full pr-3 mt-4 flex justify-center">
            <input @focus=Utils.scrollToBottom @input=writingInput @keyup.enter=buttonClicked v-model=name type="text" placeholder="Player 123" class="bg-900 w-full border-4 color-100 border-100 p-3 pl-6 pr-6 text-size rounded-full shadow" spellcheck="false" autocomplete="false" maxlength="25" />
            <img class="h-8 absolute left-full top-1/2 -translate-x-full -translate-y-1/2 -ml-11 duration-300" :class="{ 'opacity-0': !displayInputWarning }" src="@/assets/icons/warning.svg" />
        </div>

        <div class="mt-8 flex justify-center">
            <ButtonClassic @click=buttonClicked> Jouer </ButtonClassic>
        </div>

        <div class="mt-20 cursor-pointer flex flex-row justify-center items-center gap-2" @click="$emit('seeRules')">
            <img class="h-10 w-10 -mt-1 border-3 border-100 rounded-full" src="@/assets/icons/information.svg" />
            <SmallHeader class="text-center -mt-2"> DECOUVRIR LE PRINCIPE </SmallHeader>
        </div>

        <Teleport to="body">
            <NotConnected :show="showConnectionErrorPopup" @close="showConnectionErrorPopup = false"></NotConnected>
        </Teleport>

        <Teleport to="body">
            <ModalTextContent :button="'OK'" :title="'Communication interrompu'" :show="showDownloadUserDataError" @close="showDownloadUserDataError = false">
                Un problème de communication avec le serveur est servenu. <br /><br />Les données de ton compte n'ont pas pu être chargées. Vérifie ta connexion et réessaie de te connecter.
            </ModalTextContent>
        </Teleport>

        <Teleport to="body">
            <ModalTextContent :button="'OK'" :title="'Echec du chargement des données'" :show="showServerError" @close="showServerError = false">
                Une erreur est survenue lors du chargement. Veuillez réessayer dans quelques secondes.
            </ModalTextContent>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { storeToRefs } from 'pinia';

    import router from '@/router/router';

    import { socket } from '@/socket';

    import { useGeneralStore } from '@/stores/general';
    import { useAccountStore } from '@/stores/account';

    import Utils from '@/static/utils';

    import NotConnected from '@/components/popup/NotConnected.vue';
    import ModalTextContent from '@/components/popup/BasicTextContent.vue';

    import ButtonClassic from '@/ui/buttons/ButtonClassic.vue';
    import ButtonRounded from '@/ui/buttons/ButtonRounded.vue';

    import Avatar from '@/components/avatar/Avatar.vue';
    
    import Text from '@/ui/text/Text.vue';
    import SmallHeader from '@/ui/text/SmallHeader.vue';

    const { internetAvailable, showDownloadUserDataError, showServerError } = storeToRefs(useGeneralStore());
    const { avatarid, name } = storeToRefs(useAccountStore());

    const displayInputWarning = ref(false);
    const showConnectionErrorPopup = ref(false);

    function buttonClicked() {
        if(internetAvailable.value && socket.connected) {
            if(name.value.trim() == "") displayInputWarning.value = true;
            else {
                displayInputWarning.value = false;
                router.push('/mode');
            }
        } else showConnectionErrorPopup.value = true;
    }

    function writingInput() {
        if(name.value.trim() != "") displayInputWarning.value = false;
    }
</script>