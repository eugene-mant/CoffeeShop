import HomePage from '~/views/pages/HomePage.vue';
import AboutPage from '~/views/pages/AboutPage.vue';
import NotFoundPage from '~/views/pages/NotFoundPage.vue';
import FaqPage from '~/views/pages/FaqPage.vue';
import MenuPage from '~/views/pages/MenuPage.vue';
import D from '~/dev/InDevelopment.vue';

export default [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/menu', component: MenuPage },
    { path: '/menu/:category', component: D, props: { type: 'page', title: '/menu/:category'}},
    { path: '/menu/:category/:id', component: D, props: { type: 'page', title: '/menu/:category/:id'}},
    { path: '/basket', component: D, props: { type: 'page', title: '/basket'}},
    { path: '/orders', component: D, props: { type: 'page', title: '/orders'}},
    { path: '/profile', component: D, props: { type: 'page', title: '/profile'}},
    { path: '/faq', component: FaqPage },
    { path: '/:pathMatch(.*)', component: NotFoundPage }
]