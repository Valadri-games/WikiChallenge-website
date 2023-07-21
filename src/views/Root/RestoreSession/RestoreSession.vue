<template>
    <div class="bg-900">
        <Mobile v-if="showMobile" />
        <!-- <Desktop v-if="!showMobile" /> -->
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from "pinia";

    import { useGeneralStore } from "@/stores/general";

    // import Desktop from "./desktop/Desktop.vue";
    import Mobile from "./Mobile.vue";

    const { showMobile } = storeToRefs(useGeneralStore());
</script>