<template>
    <div class="bg-900">
        <HamburgerMenu v-once />

        <MobileMenuVue v-if="showMobile" />
        <DesktopMenuVue v-if="!showMobile" />

        <Mobile v-if="showMobile" />
        <!-- <Desktop v-if="!showMobile" /> -->
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from "pinia";

    import router from "@/router/router";

    import { useGeneralStore } from "@/stores/general";

    import MobileMenuVue from "@/components/menu/MobileMenu.vue";
    import DesktopMenuVue from "@/components/menu/DesktopMenu.vue";
    // import Desktop from "./desktop/Desktop.vue";
    import Mobile from "./Mobile.vue";

    import HamburgerMenu from "@/components/menu/HamburgerMenu.vue";

    const { showMobile, loggedIn } = storeToRefs(useGeneralStore());

    if(loggedIn.value != true) {
        router.push("/");
    }
</script>