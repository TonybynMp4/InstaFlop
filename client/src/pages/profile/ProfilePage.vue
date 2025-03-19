<script setup lang="ts">
    import { ref } from 'vue';
    import useAuthStore from '@/stores/auth-store';

    const authStore = useAuthStore()
    const user = authStore.getUser;
    const userData = ref({
        email: user?.email ?? '',
        role: user?.role ?? 'user'
    });

</script>

<template>
    <main>
        <h1>Profile Page !</h1>

        <section id="user-info">
            <h2>User Info</h2>
            <p id="user-email">{{ userData.email }}</p>
            <p id="user-role">{{ userData.role }}</p>
        </section>
    </main>
</template>

<style scoped>
main {
    width: 80%;
    margin: 2.5% auto;
}
</style>