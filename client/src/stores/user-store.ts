import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    const user = ref<any>(JSON.parse(localStorage.getItem('user') || 'null'));

    const getUser = () => {
        return user.value;
    }

    const setUser = (newUser: any) => {
        user.value = newUser;
    }

    async function register(userData: any) {
        try {
            const response = await fetch('/api/user/register', { // Remplacez par votre endpoint
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const data = await response.json();

            if (response.ok) {
                user.value = data.user;
                localStorage.setItem('user', JSON.stringify(data.user));
                return true; // Indique le succès
            } else {
                console.error('Registration failed:', data.message);
                return false; // Indique l'échec
            }
        } catch (error) {
            console.error('Registration error:', error);
            return false; // Indique l'échec
        }
    }

    async function update(userData: any) {
        try {
            const response = await fetch('/api/user/' + user.value.id, { // Remplacez par votre endpoint
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Important pour l'authentification
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();

            if (response.ok) {
                user.value = data.user;
                localStorage.setItem('user', JSON.stringify(data.user));
                return true; // Indique le succès
            } else {
                console.error('Update failed:', data.message);
                return false; // Indique l'échec
            }
        } catch (error) {
            console.error('Update error:', error);
            return false; // Indique l'échec
        }
    }

    async function read(id: number) {
        try {
            const response = await fetch('/api/user/getUser' + id, { // Remplacez par votre endpoint
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Important pour l'authentification
                }
            });
            const data = await response.json();

            if (response.ok) {
                user.value = data.user;
                localStorage.setItem('user', JSON.stringify(data.user));
                return true; // Indique le succès
            } else {
                console.error('Read failed:', data.message);
                return false; // Indique l'échec
            }
        } catch (error) {
            console.error('Read error:', error);
            return false; // Indique l'échec
        }
    }

    async function remove(id: number) {
        try {
            const response = await fetch('/api/user/' + id, { // Remplacez par votre endpoint
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Important pour l'authentification
                }
            });

            if (response.ok) {
                user.value = null;
                localStorage.removeItem('user');
                return true; // Indique le succès
            } else {
                console.error('Delete failed:', response);
                return false; // Indique l'échec
            }
        } catch (error) {
            console.error('Delete error:', error);
            return false; // Indique l'échec
        }
    }

    return { getUser, register, update, read, remove };
});
