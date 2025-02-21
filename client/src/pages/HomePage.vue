<script setup lang="ts">
    import baseURL from '../baseUrl';
    import { onBeforeMount, ref } from 'vue';
    import type { User } from '../types';

    interface ExtendedUser extends User {
        id: number;
        createdRelativeTime: number;
    }

    const users = ref<ExtendedUser[]>([]);

    onBeforeMount(async () => {
        const response = await fetch(`${baseURL}/api/user/getUsers`);
        const data = await response.json();

        if (!response.ok) {
            console.error(data);
            return;
        }

        users.value = data.map((user: any) => {
            const diffInHours = Math.floor((new Date(user.created_at).getTime() - Date.now()) / (1000 * 60 * 60))

            return {
                id: user.id,
                username: user.username,
                createdRelativeTime: diffInHours
            };
        });
    });
</script>

<template>
    <main>
        <h1>Home Page !</h1>
        <ul id="user-list">
            <li v-for="user in users" :key="user.id">
                <p>{{ user.username }} Created At: {{ new Intl.RelativeTimeFormat('fr-FR').format(user.createdRelativeTime, 'hours') }}</p>
            </li>
        </ul>
    </main>
</template>

<style scoped>
    main {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }
</style>