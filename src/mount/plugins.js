import { createRouter, createWebHistory } from 'vue-router';
import routes from '~/mount/routes.js';

import iconsPlugin from '~/plugins/iconsPlugin/index.js';
import icons from '~/mount/icons.js';

import devPlugin from '~/dev/devPlugin.js';

import authPlugin from '~/plugins/authPlugin/index.js';
import authAPI from '~/bll/services/authService/api.js';

import { createStore } from 'vuex';
import store from '~/store/store-vuex.js';

// створюємо роутер
const router = createRouter({
	history: createWebHistory(),
	routes
});
// створюємо store
const vuexStore = createStore(store);

export default {
    install(app) {
        app
        .use(vuexStore)
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