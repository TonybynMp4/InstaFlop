<script setup lang="ts">
    import { ref } from 'vue';
    import { useUserStore } from '../stores/user-store';

    const userStore = useUserStore()
    const user = userStore.getUser()
    const userData = ref({
        email: user?.email || '',
        role: user?.role || 'user'
    });

</script>

<template>
    <main>
        <h1>Dashboard Page !</h1>

        <section id="user-info">
            <h2>User Info</h2>
            <p id="user-email">{{ userData.email }}</p>
            <p id="user-role">{{ userData.role }}</p>
        </section>
    </main>
</template>

<style scoped>
</style>