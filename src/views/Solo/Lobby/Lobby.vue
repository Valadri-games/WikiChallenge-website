<template>
    <div>
        <Mobile v-if="showMobile" />
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from "pinia";
    import { onMounted, watch } from "vue";

    import router from "@/router/router";

    import { useGeneralStore } from "@/stores/general";
    import { useSoloModeStore } from "@/stores/soloMode";

    import Mobile from "./mobile/Mobile.vue";

    const { showMobile, minimumToRestore, lastPath } = storeToRefs(useGeneralStore()); 
    const { gameStarted, currentPage, startPage } = storeToRefs(useSoloModeStore());

    if(showMobile.value == false) {
        router.push("/solo");
    }
    
    watch(showMobile, (newVal) => {
        if(newVal == false) {
            router.push("/solo");
        }
    });

    onMounted(() => {
        minimumToRestore.value = true;
        lastPath.value = router.currentRoute.value.fullPath;

        gameStarted.value = false;
        currentPage.value = startPage.value;
    });
</script>