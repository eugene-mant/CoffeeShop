import remoteDb from '~/bll/localDAL/sqlite/client/remoteDb';
import { getRoleTypeByName } from './userRoleTypes';

export default {
    async login(opts) {
        let ok = false, data = null;
        const user = await remoteDb.request('users/getByUsernameAndPassword', {
            username: opts.username,
            password: opts.password
        });
        if(user) {
            ok = true;
            data = user;
            data.role = getRoleTypeByName(data.role || 'user') 
        }

        // зберігаємо щось в localstorage

        return { isOk: ok, data };
    },
    logout() {
        // видаляємо щось з localstorage
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