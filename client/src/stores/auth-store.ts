import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import baseURL from '../baseUrl';
import { useRouter } from 'vue-router';
import type { User } from '../types';

const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(localStorage.getItem('token'));
    const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));
    const router = useRouter();

    function setToken(newToken: string | null) {
        if (newToken === null) {
            localStorage.removeItem('token');
            token.value = null;
            return token;
        }

        token.value = newToken;
        localStorage.setItem('token', newToken);

        return token;
    }
    const getToken = computed(() => token.value);

    function setUser(newUser: User | null) {
        user.value = newUser === null ? null : {
            username: newUser.username,
            email: newUser.email,
            role: newUser.role
        };

        localStorage.setItem('user', JSON.stringify(user.value));
        return user;
    }
    const getUser = computed(() => user.value);

    async function readUser() {
        const user = await fetch(baseURL + '/api/user', {
            headers: {
                Authorization: `Bearer ${getToken.value}`
            },
        }).then((res) => res.json());

        return user;
    }

    async function login(credentials: { email: string, password: string }) {
        try {
            const response: {
                token: string
            } = await fetch(baseURL + '/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            }).then((res) => res.json());

            if (response.token) {
                setToken(response.token);
                localStorage.setItem('token', response.token);
                setUser(await readUser());

                router.push('/dashboard');
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Login failed:', error);
            return error;
        }
    }

    function logout() {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        if (getToken.value === null) {
            router.push('/login');
            return true;
        }

        return false
    }

    return {
        setToken,
        getToken,
        setUser,
        getUser,
        login,
        logout
    };
});

export default useAuthStore;