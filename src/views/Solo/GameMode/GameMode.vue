<template>
    <div>
        <HamburgerMenu v-if="!showMobile" />
        <DesktopMenuVue v-if="!showMobile" />

        <Mobile v-if="showMobile" />
        <Desktop v-if="!showMobile" />
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from "pinia";
    import { onMounted, onUnmounted } from "vue";

    import router from "@/router/router";

    import { useGeneralStore } from "@/stores/general";

    import Mobile from "./Mobile.vue";
    import Desktop from "./Desktop.vue";

    import DesktopMenuVue from "@/components/menu/DesktopMenu.vue";
    import HamburgerMenu from "@/components/menu/HamburgerMenu.vue";

    const { showMobile, minimumToRestore, lastPath } = storeToRefs(useGeneralStore());

    onMounted(() => {
        minimumToRestore.value = true;
        lastPath.value = router.currentRoute.value.fullPath;

        pushState();
    });

    onUnmounted(() => {
        window.removeEventListener("popstate", pushState);
    });

    function pushState() {
        history.pushState({}, "");
    }

    window.addEventListener("popstate", pushState);
</script>