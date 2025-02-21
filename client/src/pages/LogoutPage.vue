<template>
        <h1>Logging out...</h1>
</template>

<script setup lang="ts">
    import { onBeforeMount } from 'vue';
    import useAuthStore from '../stores/auth-store';
    import { useRouter } from 'vue-router';
    const router = useRouter();

    const authStore = useAuthStore();
    onBeforeMount(() => {
        if (authStore.logout()) {
            router.push('/login');
        }
    });
</script>