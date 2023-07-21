<template>
    <div class="bg-900">
        <Default v-if="!loggedIn" />
        <LoggedIn v-if="loggedIn" />
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from "pinia";

    import { useAccountStore } from "@/stores/account";

    import Default from "./mobile/Default.vue";
    import LoggedIn from "./mobile/LoggedIn.vue";

    const { loggedIn } = storeToRefs(useAccountStore());
</script>