<template>
    <div>
        <!-- Mobile --> 
        <div class="absolute w-full duration-500" v-if="showMobile">
            <div class="relative w-full flex justify-center mt-4">
                <Avatar :avatarID=avatarID class="h-[190px] w-[190px]" />

                <ButtonRounded class="absolute top-full -translate-y-full left-1/2 -translate-x-1/2 ml-20 -mt-2 scale-110" @click=regenerateAvatar>
                    <img class="h-11 w-11" src="@/assets/icons/looped-arrow.svg" />
                </ButtonRounded>
            </div>

            <Text class="mt-7"> Pseudo </Text>

            <div class="relative w-full pr-3 mt-2 flex justify-center">
                <input @focus=scrollToBottom @input=writingInput @keyup.enter=buttonClicked v-model=playerName type="text" placeholder="Player 123" class="bg-900 w-full border-4 color-100 border-100 p-3 pl-6 pr-6 text-size rounded-full shadow" spellcheck="false" autocomplete="false" maxlength="25" />
                <img class="h-8 absolute left-full top-1/2 -translate-x-full -translate-y-1/2 -ml-11 duration-300" :class="{ 'opacity-0': !displayInputWarning1 }" src="@/assets/icons/warning.svg" />
            </div>

            <Text class="mt-7"> Mot de passe </Text>

            <div class="relative w-full pr-3 mt-2 flex justify-center">
                <input @focus=scrollToBottom @input=writingInput @keyup.enter=buttonClicked v-model=password type="password" placeholder="Player 123" class="bg-900 w-full border-4 color-100 border-100 p-3 pl-6 pr-6 text-size rounded-full shadow" spellcheck="false" autocomplete="false" maxlength="25" />
                <img class="h-8 absolute left-full top-1/2 -translate-x-full -translate-y-1/2 -ml-11 duration-300" :class="{ 'opacity-0': !displayInputWarning2 }" src="@/assets/icons/warning.svg" />
            </div>

            <div class="mt-10 flex justify-center">
                <ButtonClassic @click=buttonClicked :smallPad="true"> Crée&nbsp;un&nbsp;compte </ButtonClassic>
            </div>

            <Teleport to="body">
                <ServerError :show="showLoginError" @close="showLoginError = false"></ServerError>
            </Teleport>

            <Teleport to="body">
                <NameAlreadyTaken :show="showUnavailableName" @close="showUnavailableName = false"></NameAlreadyTaken>
            </Teleport>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { storeToRefs } from 'pinia';
    import router from '@/router/router';

    import { useGeneralStore } from '@/stores/general';

    import AccountManager from '@/static/accountManager';

    import Text from '@/ui/text/Text.vue';

    import ButtonClassic from '@/ui/buttons/ButtonClassic.vue';
    import ButtonRounded from '@/ui/buttons/ButtonRounded.vue';

    import Avatar from '@/components/avatar/Avatar.vue';

    import ServerError from '@/views/Home/mobile/modal/ServerError.vue';
    import NameAlreadyTaken from '@/views/Home/mobile/modal/NameAlreadyTaken.vue';

    const { avatarID, playerName, avatarCount, homeFormStep, showMobile, showLoginError, showUnavailableName, loggedIn } = storeToRefs(useGeneralStore());

    const password = ref("");

    const displayInputWarning1 = ref(false);
    const displayInputWarning2 = ref(false);

    function regenerateAvatar() {
        if(avatarID.value < avatarCount.value) avatarID.value += 1;
        else avatarID.value = 1;
    }

    function buttonClicked() {
        if(playerName.value.trim() == "") displayInputWarning1.value = true;
        else if(password.value.trim() == "") displayInputWarning2.value = true;
        else {
            displayInputWarning1.value = false;
            displayInputWarning2.value = false;

            AccountManager.createAccount(password.value);
        }
    }

    function writingInput() {
        if(playerName.value.trim() != "") displayInputWarning1.value = false;
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