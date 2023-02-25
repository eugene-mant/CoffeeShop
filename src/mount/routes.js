import HomePage from '~/views/pages/HomePage.vue';
import AboutPage from '~/views/pages/AboutPage.vue';
import NotFoundPage from '~/views/pages/NotFoundPage.vue';

export default [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/:pathMatch(.*)', component: NotFoundPage }
]