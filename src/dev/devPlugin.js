import InDevelopment from '~/dev/views/InDevelopment.vue';
import productsApi from '~/bll/productsApi.js';

export default {
    install(app) {
        // задаємо як глобальний компонент
        app.component('InDev', InDevelopment);

        self.app = app;
        self.api = productsApi;
        self.auth = app.config.globalProperties.$auth;
    }
}