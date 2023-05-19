import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import routes from '~/mount/routes.js';

import iconsPlugin from '@code/vue-plugins/iconsPlugin/index.js';
import icons from '~/mount/icons.js';

import devPlugin from '~/dev/devPlugin.js';

import authPlugin from '@code/vue-plugins/authPlugin/index.js';
import authAPI from '~/bll/services/authService/api.js';

import { createStore as createVuexStore } from 'vuex';
import vuexStoreObj from '~/dev/vuex-store/store-vuex.js';


// створюємо роутер
const router = createRouter({
	history: createWebHistory(),
	routes
});

export default {
    install(app) {
        app
        // створюємо vuex store (поки не видаляю)
        .use(createVuexStore(vuexStoreObj))
        // створюємо pinia store
        .use(createPinia())
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