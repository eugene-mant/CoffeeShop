import HomePage from '~/views/pages/HomePage.vue';
import AboutPage from '~/views/pages/AboutPage.vue';
import NotFoundPage from '~/views/pages/NotFoundPage.vue';
import FaqPage from '~/views/pages/FaqPage.vue';
import MenuPage from '~/views/pages/MenuPage.vue';
import TestPages from '~/views/pages/TestPages.vue';

import D from '~/dev/InDevelopment.vue';
import DemoPage from '~/dev/DemoPage.vue';

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
    { path: '/demo', component: DemoPage },
    { path: '/:pathMatch(.*)', component: NotFoundPage },
    { path: '/test', component: TestPages}
]