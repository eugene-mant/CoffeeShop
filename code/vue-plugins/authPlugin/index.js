/*
    Створюємо свою маленьку систему аутентифікації.
    Оформимо її в плагін.
*/

// база по реактивності:
// https://ua.vuejs.org/api/reactivity-core.html
import { ref } from 'vue';

const auth = {
    _api: null,
    _router: null,
    _opts: {
        // сподіваюсь, значення цих параметрів зрозуміло по назвах
        afterLoginRoute: null,
        afterLogoutRoute: null,
        unAuthRoute: null,
        noAccessByRoleRoute: null,
    },
    // реактивний флажок, чи авторизований користувач
    _isAuth: ref(false),
    // Дані користувача. Можна визначити будь-які,
    // можна зробити реактивними. Поки так
    state: {
        //username: null,
        //role: null
    },
    get API() { 
        return this._api; 
    },
    get isAuth() { 
        return this._isAuth.value; 
    },
    set isAuth(value) { 
        // аналог logout-a? Можна вийте використовуючи $auth.isAuth = false
        if(!value) {
            this.logout();
        }
    },

    init({ api, router, ...opts }) {
        if(!api || !router) {
            // api та router, обов'язкові параметри!
            throw new Error('AuthPlugin: need to define API and VueRouter');
        }

        this._api = api;
        this._router = router;

        this._beforeRouteHook = this._beforeRouteHook.bind(this);
        this._router.beforeEach(this._beforeRouteHook);

        this._opts.afterLogoutRoute = opts.afterLogoutRoute || '/';
        this._opts.unAuthRoute = opts.unAuthRoute || '/login';
        this._opts.noAccessByRoleRoute = opts.noAccessByRoleRoute || '/no-access';

        // запитуємо стан при ініціалізації 
        const state = this._api.getState();
        this.updateState(state.data);
        this._isAuth.value = state.isAuth;

        return this;
    },
    updateState(state) {
        for(let key in state) {
            this.state[key] = state.data;
        }
    },
    // функція, що буде виконуватись перед кожним переходом по новому роуту 
    _beforeRouteHook(route) {
        // перевіряємо чи в meta роута вказано isAuth == true
        const { meta } = route; 
        if(meta && meta.isAuth) {
            // якщо юзер не залогінений
            if(!this._isAuth.value) {
                // запамятовуємо, куди треба перейти після входу
                this._opts.afterLoginRoute = route.fullPath;
                return this._opts.unAuthRoute;
            }

            if(meta.roles) {
                // перевіряємо чи є у користувача права доступу згідно ролі

                //if(!meta.roles.includes[this.state.role]) {
                // відмовився. деталі тут '~/bll/auth/userRoleTypes.js';

                if(meta.role <= this.state.role) {
                    this._opts.afterLoginRoute = route.fullPath;
                    return this._opts.noAccessByRoleRoute;
                }
                // перевірка по ролям не задана. доступ є у всіх
            }
        }
    },

    async login(data) {
        if(this._isAuth.value) {
            return false;
        }

        const res = await this._api.login(data);
        if(!res.isOk) {
            return false;
        }

        this.updateState(res.data);
        this._isAuth.value = true;

        if(this._opts.afterLoginRoute) {
            this._router.push(this._opts.afterLoginRoute);
            this._opts.afterLoginRoute = null;
        }
        return true;
    },
    async logout() {
        this._api.logout();
        this._isAuth.value = false;
        this.state = {};
    },
    async signup(data) {
        let res = await this._api.signup(data);
        if(!res.isOk) {
            // регістрація пройшла невдало
            // щось робимо...
        }

        // ...
    }
};

export default {
    install(app, opts={}) {
        if(!opts.router) {
            // якщо роутера немає в opts, пробуємо взяти з глобальних властивостей
            // router повинен бути додаданий перед підключенням цього плагіна
            opts.router = app.config.globalProperties.$router;
        }
        
        // додаємо auth як глобальну властивість
        // тепер він буде доступний через this.$auth у будь-якому компоненті
        // так само, як це робить роутер - this.$router
        app.config.globalProperties.$auth = auth.init(opts);

        /*
        тепер можна буде так:
            <div v-if="$auth.isAuth"></div>
            <div v-else></div>
        */
    }
}