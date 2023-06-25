<template>
    <div class="bg-900">
        <HamburgerMenu v-once />

        <DesktopMenuVue v-if="!showMobile" />
        <!-- <Desktop v-if="!showMobile" /> -->
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from "pinia";

    import router from "@/router/router";

    import { useGeneralStore } from "@/stores/general";

    import DesktopMenuVue from "@/components/menu/DesktopMenu.vue";
    // import Desktop from "./desktop/Desktop.vue";

    import HamburgerMenu from "@/components/menu/HamburgerMenu.vue";

    const { showMobile, loggedIn } = storeToRefs(useGeneralStore());

    if(loggedIn.value == true) {
        router.push("/settings/account/");
    }

    if(showMobile) {
        router.replace("/create-account");
    }
</script>