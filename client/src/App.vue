<template>
    <header>
        <h1>
			<router-link to="/" class="header__title">InstaFlop</router-link>
        </h1>
        <ul>
            <li>
                <router-link class="button" to="/">Landing</router-link>
            </li>
            <li v-if="!isLoggedIn">
                <router-link class="button" to="/register">Register</router-link>
            </li>
            <li v-if="!isLoggedIn">
                <router-link class="button" to="/login">Login</router-link>
            </li>
            <li v-if="isLoggedIn">
                <router-link class="button" to="/home">Home</router-link>
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
    const isLoggedIn = computed(() => authStore.getUser !== null);
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

	.header__title {
		text-decoration: none;
		color: inherit;
		font-size: 2rem;
		font-weight: bold;
	}

    header ul {
        display: flex;
        gap: 1rem;
        margin: 0;
    }

    header ul li {
        list-style: none;
    }

	footer {
		background-color: #f1f1f1;
		color: #333;
		width: 100%;
		display: flex;
		padding: 1rem;
		justify-content: center;
		align-items: center;
	}
</style>