import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
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
    ]
})