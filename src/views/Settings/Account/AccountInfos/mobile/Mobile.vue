<template>
    <div class="absolute w-full h-full overflow-hidden flex flex-col pt-20 duration-300">
        <div class="mt-8 flex justify-center">
            <ButtonClassic @click=selfLogout> Se deconnecter </ButtonClassic>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';

    import { useGeneralStore } from '@/stores/general';

    import ButtonClassic from '@/ui/buttons/ButtonClassic.vue';
import router from '@/router/router';

    const generalStore = useGeneralStore();
    const { } = storeToRefs(generalStore);

    function selfLogout() {
        generalStore.logout();

        router.push('/');
    }
</script>