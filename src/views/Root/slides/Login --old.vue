<template>
    <div>
        <!-- Mobile --> 
        <div class="absolute w-full duration-500" v-if="showMobile">
            <Header class="w-full text-center mt-28"> Connecte-toi </Header>

            <Text class="mt-14"> Pseudo </Text>

            <div class="relative w-full pr-3 mt-2 flex justify-center">
                <input @focus=scrollToBottom @input=writingInput @keyup.enter=buttonClicked v-model=name type="text" placeholder="Player 123" class="bg-900 w-full border-4 color-100 border-100 p-3 pl-6 pr-6 text-size rounded-full shadow" spellcheck="false" autocomplete="false" autocapitalize="off"  maxlength="25" />
                <img class="h-8 absolute left-full top-1/2 -translate-x-full -translate-y-1/2 -ml-11 duration-300" :class="{ 'opacity-0': !displayInputWarning1 }" src="@/assets/icons/warning.svg" />
            </div>

            <Text class="mt-7"> Mot de passe </Text>

            <div class="relative w-full pr-3 mt-2 flex justify-center">
                <input @focus=scrollToBottom @input=writingInput @keyup.enter=buttonClicked v-model=password type="password" placeholder="Player 123" class="bg-900 w-full border-4 color-100 border-100 p-3 pl-6 pr-6 text-size rounded-full shadow" spellcheck="false" autocomplete="false" autocapitalize="off" maxlength="25" />
                <img class="h-8 absolute left-full top-1/2 -translate-x-full -translate-y-1/2 -ml-11 duration-300" :class="{ 'opacity-0': !displayInputWarning2 }" src="@/assets/icons/warning.svg" />
            </div>

            <div class="mt-10 flex justify-center">
                <ButtonClassic @click=buttonClicked> Se connecter </ButtonClassic>
            </div>

            <Teleport to="body">
                <ServerError :show="showLoginError" @close="showLoginError = false"></ServerError>
            </Teleport>

            <Teleport to="body">
                <ModalTextContent :button="'Réessayer'" :title="'Compte introuvable'" :show="showPasswordError" @close="showPasswordError = false">
                    Le mot de passe ou le pseudo sont incorrect, veuillez réessayer.
                </ModalTextContent>
            </Teleport>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { storeToRefs } from 'pinia';
    import router from '@/router/router';

    import { useGeneralStore } from '@/stores/general';
    import { useAccountStore } from '@/stores/account';

    import AccountManager from '@/static/accountManager';

    import Header from '@/ui/text/Header.vue';
    import Text from '@/ui/text/Text.vue';

    import ButtonClassic from '@/ui/buttons/ButtonClassic.vue';

    import ServerError from '@/components/popup/ServerError.vue';
    import ModalTextContent from '@/components/popup/BasicTextContent.vue';

    const { homeFormStep, showMobile, showLoginError, showPasswordError } = storeToRefs(useGeneralStore());
    const { name, loggedIn } = storeToRefs(useAccountStore());

    const password = ref("");

    const displayInputWarning1 = ref(false);
    const displayInputWarning2 = ref(false);

    function buttonClicked() {
        if(name.value.trim() == "") displayInputWarning1.value = true;
        else if(password.value.trim() == "") displayInputWarning2.value = true;
        else {
            displayInputWarning1.value = false;
            displayInputWarning2.value = false;

            AccountManager.login(password.value);
        }
    }

    function writingInput() {
        if(name.value.trim() != "") displayInputWarning1.value = false;
        if(password.value.trim() != "") displayInputWarning2.value = false;
    }

    function scrollToBottom() {
        //@ts-ignore
        document.getElementById('app').firstElementChild.scroll({
            top: 1000,
            left: 0,
            behavior: 'smooth'
        }); 
    }

    onMounted(() => {
        homeFormStep.value = -2;
    });

    if(loggedIn.value == true) {
        router.push("/settings/account/");
    }
</script>