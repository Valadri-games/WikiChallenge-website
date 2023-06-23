<template>
    <div>
        <Mobile v-if="showMobile" />
        <Desktop v-if="!showMobile" />
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from "pinia";

    import { useGeneralStore } from "@/stores/general";

    import Mobile from "./mobile/Mobile.vue";
    import Desktop from "./desktop/Desktop.vue";

    const { showMobile } = storeToRefs(useGeneralStore());
</script>