<template>
    <div class="bg-900">
        <MobileMenuVue v-if="showMobile" />
        <DesktopMenuVue v-if="!showMobile" />

        <Mobile v-if="showMobile" />
        <!-- <Desktop v-if="!showMobile" /> -->
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from "pinia";

    import { useGeneralStore } from "@/stores/general";

    import MobileMenuVue from "@/components/menu/MobileMenu.vue";
    import DesktopMenuVue from "@/components/menu/DesktopMenu.vue";
    // import Desktop from "./desktop/Desktop.vue";
    import Mobile from "./Mobile.vue";

    const { showMobile } = storeToRefs(useGeneralStore());
</script>