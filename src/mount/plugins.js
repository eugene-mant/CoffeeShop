import { createRouter, createWebHistory } from 'vue-router';
import routes from '~/mount/routes.js';

import iconsPlugin from '~/plugins/iconsPlugin/index.js';
import icons from '~/mount/icons.js';

import devPlugin from '~/dev/devPlugin.js';

import authPlugin from '~/plugins/authPlugin/index.js';
import authAPI from '~/bll/authService/api.js';


// створюємо роутер
const router = createRouter({
	history: createWebHistory(),
	routes
});

export default {
    install(app) {
        app
        .use(router)
        .use(authPlugin, { 
            api: authAPI, 
            router,
            unAuthRoute: '/auth/login'
        })
        .use(iconsPlugin, { icons })
        .use(devPlugin);
    }
}