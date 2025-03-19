<template>
    <header>
        <h1>
            InstaFlop
        </h1>
        <ul>
            <li>
                <router-link class="button" to="/">Home</router-link>
            </li>
            <li v-if="!isLoggedIn">
                <router-link class="button" to="/register">Register</router-link>
            </li>
            <li v-if="!isLoggedIn">
                <router-link class="button" to="/login">Login</router-link>
            </li>
            <li v-if="isLoggedIn">
                <router-link class="button" to="/dashboard">Dashboard</router-link>
            </li>
            <li v-if="isLoggedIn">
                <ButtonComponent :id="'logout'" :label="'Logout'" @click="onClickLogout" />
            </li>
        </ul>
    </header>
    <router-view></router-view>
    <footer>
        <p>&copy; 2025 InstaFlop</p>
    </footer>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import useAuthStore from './stores/auth-store';
    import ButtonComponent from './components/ButtonComponent.vue';
    const authStore = useAuthStore();
    const isLoggedIn = computed(() => authStore.getUser() !== null);
    const onClickLogout = () => authStore.logout();
</script>

<style>
    header {
        background-color: #f1f1f1;
        color: #333;
        width: 100%;
        display: flex;
        padding: 1rem;
        justify-content: space-between;
        align-items: center;
    }

    header ul {
        display: flex;
        gap: 1rem;
        margin: 0;
    }

    header ul li {
        list-style: none;
    }
</style>