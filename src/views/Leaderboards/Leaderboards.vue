<template>
    <div class="bg-900">
        <router-view v-slot="{ Component, route }" class="absolute w-full h-full">
            <transition :name=route.meta.useTransition>
                <component :is=Component />
            </transition>
        </router-view>
    </div>
</template>