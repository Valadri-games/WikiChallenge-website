<template>
    <div class="bg-accent">
        <HamburgerMenu v-once :light="true" />

        <MobileMenuVue v-if="showMobile" />
        <DesktopMenuVue v-if="!showMobile" />

        <Mobile v-if="showMobile" />
        <Desktop v-if="!showMobile" />
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from "pinia";

    import { useGeneralStore } from "@/stores/general";

    import MobileMenuVue from "@/components/menu/MobileMenu.vue";
    import DesktopMenuVue from "@/components/menu/DesktopMenu.vue";
    import Desktop from "./Desktop.vue";
    import Mobile from "./Mobile.vue";

    import HamburgerMenu from "../../components/menu/HamburgerMenu.vue";

    const { showMobile } = storeToRefs(useGeneralStore());
</script>