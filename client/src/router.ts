import { createRouter, createWebHashHistory } from 'vue-router'
import useAuthStore from './stores/auth-store';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: () => import('./pages/HomePage.vue')
        },
        {
            path: '/login',
            component: () => import('./pages/LoginPage.vue')
        },
        {
            path: '/register',
            component: () => import('./pages/RegisterPage.vue')
        },
        {
            path: '/logout',
            component: () => import('./pages/LogoutPage.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/dashboard',
            component: () => import('./pages/DashboardPage.vue'),
            meta: { requiresAuth: true },
        },
    ],
});

router.beforeEach((to, _, next) => {
    const authStore = useAuthStore();
    const isLoggedIn = authStore.getToken ?? false;


    if (to.meta.requiresAuth && !isLoggedIn) {
        return next('/login');
    } else if (isLoggedIn) {
        if (to.path === '/login' || to.path === '/register') {
            return next('/dashboard');
        } else if (to.path === '/logout') {
            return next();
        }
    }

    return next();
});

export default router;