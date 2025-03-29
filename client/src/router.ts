import { createRouter, createWebHistory } from 'vue-router'
import useAuthStore from '@/stores/auth-store';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/pages/LandingPage.vue')
        },
        {

            path: '/home',
            component: () => import('@/pages/home/HomePage.vue')
        },
        {
            path: '/login',
            component: () => import('@/pages/login/LoginPage.vue')
        },
        {
            path: '/register',
            component: () => import('@/pages/register/RegisterPage.vue')
        },
        {
            path: '/profile',
            component: () => import('@/pages/profile/ProfilePage.vue'),
            meta: { requiresAuth: true },
        },
		{
            path: '/profile/:id',
            component: () => import('@/pages/profile/ProfilePage.vue'),
        },
        {
            path: '/:pathMatch(.*)',
            component: () => import('@/pages/NotFoundPage.vue')
        }
    ],
});

router.beforeEach((to, _, next) => {
    const authStore = useAuthStore();
    const isLoggedIn = authStore.getUser?.role ?? false;

    if (to.meta.requiresAuth && !isLoggedIn) {
        return next('/login');
    } else if (isLoggedIn && (to.path === '/login' || to.path === '/register')) {
        return next('/profile');
    }

    return next();
});

export default router;