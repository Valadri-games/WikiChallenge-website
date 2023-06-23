<template>
    <div id="mobileSecondSlideContent" class="absolute w-full h-full duration-500">
        <p> mode 2 </p>
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { onMounted } from 'vue';
    import router from '@/router/router';

    import { useGeneralStore } from '@/stores/general';

    const { homeFormStep, showMobile } = storeToRefs(useGeneralStore());

    onMounted(() => {
        if(showMobile.value == false) router.go(-1);
        homeFormStep.value = 3;
    });
</script>