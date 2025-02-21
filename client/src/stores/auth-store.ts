import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import baseURL from '../baseUrl';
import { useRouter } from 'vue-router';

const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(localStorage.getItem('token'));
    const router = useRouter();

    const getToken = computed(() => token.value);

    async function login(credentials: { email: string, password: string }) {
        try {
            const response = await fetch(baseURL + '/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            }).then((res) => res.json());

            if (response.token) {
                token.value = response.token;
                localStorage.setItem('token', response.token);

                return router.push('/dashboard');
            } else {
                return response.message;
            }
        } catch (error) {
            console.error('Login failed:', error);
            return error;
        }
    }

    function logout() {
        console.log('logout');
        token.value = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        if (getToken.value === null) {
            return true
        }

        return false
    }

    return { token, getToken, login, logout };
});

export default useAuthStore;