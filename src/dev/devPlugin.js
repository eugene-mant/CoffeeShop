import InDevelopment from '~/dev/views/InDevelopment.vue';
import productsApi from '~/bll/services/productsService/api.js';
import remoteDb from '~/bll/localDAL/sqlite/client/remoteDb'

export default {
    install(app) {
        // задаємо як глобальний компонент
        app.component('InDev', InDevelopment);

        self.db = remoteDb;
        self.app = app;
        self.api = productsApi;
        self.auth = app.config.globalProperties.$auth;
    }
}