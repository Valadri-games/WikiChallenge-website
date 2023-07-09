<template>
    <PopupBase :show="show">
        <div class="flex flex-col items-center overflow-auto">
            <Header class="text-center w-full mt-4"> {{ title }} </Header>

            <Text class="mt-8 text-center">
                <slot></slot>
            </Text>

            <div class="pb-2 mt-8 w-full flex justify-center">
                <ButtonClassic @click="$emit('close')"> {{ button }} </ButtonClassic>
            </div>
        </div>
    </PopupBase>
</template>

<script setup lang="ts">
    import PopupBase from './PopupBase.vue';

    import ButtonClassic from '@/ui/buttons/ButtonClassic.vue';
    
    import Header from '@/ui/text/Header.vue';
    import Text from '@/ui/text/Text.vue';

    defineProps({
        show: Boolean,
        title: String,
        button: String,
    });
</script>