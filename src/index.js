import '~/mount/styles.scss';
import { createApp } from 'vue';
import App from '~/mount/App.vue';

import { createRouter, createWebHistory } from 'vue-router';
import routes from '~/mount/routes.js';

createApp(App)
// створюємо і додаємо роутер
.use(createRouter({
	history: createWebHistory(),
	routes
}))
.mount('#app');