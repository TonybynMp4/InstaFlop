import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import baseURL from '../baseUrl';
import { useRouter } from 'vue-router';

const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(localStorage.getItem('token'));
    const router = useRouter();

    const getToken = computed(() => token.value);

    function login(credentials: { email: string, password: string }) {
        fetch(baseURL + '/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        })
            .then(response => response.json())
            .then(response => {
                if (response.ok) {
                    token.value = response.token;
                    localStorage.setItem('token', response.token);

                    return router.push('/dashboard');
                } else {
                    console.error(response);
                    console.error('Login failed:', response.message);

                    return response.message;
                }
            }).catch(error => {
                console.error('Login error:', error);

                return error;
            });
    }

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        token.value = null;

        return true;
    }

    return { token, getToken, login, logout };
});

export default useAuthStore;