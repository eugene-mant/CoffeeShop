import createActionsStore from '@code/tools/worker-actions/backend';
import { init } from '@code/tools/sqlite-db/index';
import * as products from './products';
import * as users from './users';

import createProductItem from '~/dev/fake-data/createProductItem';


// опис @code/tools/worker-actions/readme.md
const store = createActionsStore({
    // забороняємо віддалено викликати фунції поки active == false
    // запити будуть збиратись в чергу, і виконаються коли active стане true
    active: false,
    // додаємо функції
    actions: {
        users,
        products
    }
});

// опис @code/tools/sqlite-db/readme.md
init.config({
    pathDb: 'sql/coffeeshop-db.sqlite'
});
init.sql`
    PRAGMA page_size=8192;
    PRAGMA cache_size=5000; 
    PRAGMA journal_mode=MEMORY;
`;
init(({ db }) => {
    // якщо база новостворена, заповнюємо даними
    if(db.isNew) {

        // додаємо 200 випадкових товарів
        let arr = [];
        for(let i=0; i < 200; i++) {
            arr[i] = createProductItem();
        }
        products.add(arr);

        // додаємо пару юзерів
        users.add([
            {
                username: "admin@coffee-shop.cc",
                password: "kiss-my-iron-ass",
                role: "admin",
                firstname: "Bender",
                lastname: "Rodriges"
            },
            {
                username: "kenny@gmail.com",
                password: "qwerty123",
                role: "user",
                firstname: "",
                lastname: ""
            }
        ]);
    }

    // дозволяємо з клієнта викликати "actions" функції
    store.active = true;
});
