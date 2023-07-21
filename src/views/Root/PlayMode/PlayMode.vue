<template>
    <div class="bg-900">
        <Mobile v-if="showMobile" />
        <!-- <Desktop v-if="!showMobile" /> -->
    </div>
</template>

<script setup lang="ts">
    import { onMounted } from "vue";
    import { storeToRefs } from "pinia";

    import { useGeneralStore } from "@/stores/general";

    // import Desktop from "./desktop/Desktop.vue";
    import Mobile from "./Mobile.vue";

    const { showMobile, homeFormStep } = storeToRefs(useGeneralStore());

    onMounted(() => {
        homeFormStep.value = 2;
    });
</script>