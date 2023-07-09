<template>
    <div>
        <Mobile v-if="showMobile" />
        <Desktop v-if="!showMobile" />
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from "pinia";

    import { useGeneralStore } from "@/stores/general";

    import Mobile from "./Mobile.vue";
    import Desktop from "./Desktop.vue";

    const { showMobile } = storeToRefs(useGeneralStore());
</script>