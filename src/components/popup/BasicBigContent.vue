<template>
    <PopupBase :show="show">
        <div class="flex flex-col items-center overflow-auto">
            <Header class="text-center w-full mt-2"> {{ title }} </Header>

            <div class="flex-1 overflow-y-auto pb-1 pt-1 rounded-2xl mt-6 text-justify">
                <Text> 
                    <slot></slot>
                </Text>
            </div>
            
            <div class="pb-2 mt-8 w-full flex justify-center">
                <ButtonClassic @click="$emit('close')"> Réessayer </ButtonClassic>
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