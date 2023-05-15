import roles from '~/bll/services/authService/userRoleTypes.js';

import HomePage from '~/views/pages/HomePage.vue';
import AboutPage from '~/views/pages/about/AboutPage.vue';
import FaqPage from '~/views/pages/about/FaqPage.vue';
import NotFoundPage from '~/views/pages/NotFoundPage.vue';

import MenuPage from '~/views/pages/MenuPage.vue';
import LoginPage from '~/views/pages/auth/LoginPage.vue';

import TestPages from '~/dev/views/pages/TestPages.vue';
import DemoPage from '~/dev/views/pages/DemoPage.vue';
import TestLoginPage from '~/dev/views/pages/LoginPage/LoginPage.vue';

import D from '~/dev/views/InDevelopment.vue'; // заглушка для неіснуючої сторінки
const dev = { component: D, props: { type: 'page' } };

export default [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/about/faq', component: FaqPage },

    { path: '/menu', component: MenuPage },
    { path: '/menu/:category', ...dev },
    { path: '/menu/:category/:id', ...dev },
    { path: '/basket', ...dev },
    { path: '/orders', ...dev },
    
    // auth роути
    { path: '/auth/login', component: LoginPage },
    { path: '/auth/signin', ...dev },
    { path: '/auth/forgot-password', ...dev },
    { path: '/profile', ...dev, meta: { isAuth: true }},
    
    // тест доступу по ролі
    { path: '/admin', ...dev, meta: { isAuth: true, role: roles.ADMIN }},

    { path: '/demo', component: DemoPage, meta: { isAuth: true }},
    { path: '/test', component: TestPages },
    { path: '/test-login', component: TestLoginPage },
    { path: '/:pathMatch(.*)', component: NotFoundPage }
]