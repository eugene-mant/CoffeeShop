import InDevelopment from './InDevelopment.vue';
export default {
    install(app) {
        // задаємо як глобальний компонент
        app.component('InDev', InDevelopment);
    }
}