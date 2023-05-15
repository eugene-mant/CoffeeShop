// Фейкове api аутентифікації
import usersDb from '~/static/data/db-users.json';
import userRoleTypes from './userRoleTypes.js';

const getRoleTypebyName = name => {
    for(let key in userRoleTypes) {
        if(key === name.toUpperCase()) {
            return userRoleTypes[key];
        }
    }
}

export default {
    async login(opts) {
        let user = usersDb.find(u => 
            u.username === opts.username && u.password === opts.password);

        // немає такого знайшовся
        if(!user) {
            return null;
        }

        /*
            У нас фейкові дані лежать просто у одному об'єкті
            Ми не можемо їх зараз змінити чи повернути з цієї функції
            і змінувати десь там. Це призведе до зміни в usersDb, бо об'єкти передається по
            посиланню. Спочатку треба їх скопіювати. З JSON-даними це дуже легко зробити.
        */

        // перетворюємо  у стрінгу, парсимо назад
        user = JSON.parse(JSON.stringify(user));

        // фіксимо роль юзера. детальніше в './userRoleTypes.js';
        user.role = user.role ? getRoleTypebyName(user.role) : 'user';

        // щось ще робимо ...
        // повертаємо дані користувача
        return {
            isOk: true,
            data: user
        };
    },
    logout() {

    },
    signup() {

    },
    getUserData() {

    },
    getState() {
        return {
            isAuth: false,
            data: {}
        }
    }
}