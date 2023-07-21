<template>
    <div class="bg-900">
        <Mobile v-if="showMobile" />
        <!-- <Desktop v-if="!showMobile" /> -->
    </div>
</template>

<script setup lang="ts">
    import { onMounted, onUnmounted } from "vue";
    import { storeToRefs } from "pinia";

    import { useGeneralStore } from "@/stores/general";

    // import Desktop from "./desktop/Desktop.vue";
    import Mobile from "./Mobile.vue";

    const { showMobile, minimumToRestore, homeFormStep } = storeToRefs(useGeneralStore());

    onMounted(() => {
        minimumToRestore.value = false;

        homeFormStep.value = 1;
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