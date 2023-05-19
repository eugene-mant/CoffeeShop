/*
    Треба потратити багато часу і здоров'я, для реалізації 
    на голому api indexeddb, тому я буду юзати обгортку:
    Dexie - https://dexie.org

    update 2023.05.16:
    Код як приклад. Більше не використовується 
*/

import Dexie from 'https://unpkg.com/dexie@3.2.3/dist/dexie.mjs';


const baseQueryOpts = {
    offset: 0,
    limit: 20
};
const getQueryOpts = (opts={}) => {
    const res = {};
    for(let key in baseQueryOpts) {
        res[key] = key in opts ? opts[key] : baseQueryOpts[key];
    }
    return res;
}

let db, products;
const nameDb = 'coffee-shop_products-db';
const isExists = () => Dexie.exists(nameDb);
const createDb = async (initData) => {
    db = new Dexie(nameDb);
    // це не справжня ініціалізація. 
    // Dexie створить базу при першому зверненні, а не тут
    db.version(1).stores({
        products:'++id, &article, name, price, category, available'
    });

    products = db.products; // табличка products
    if(initData) {
        // заповняємо якщо є чим 
        await products.bulkPut(initData);
    }
}
const init = async () => {
    let productsList;
    // перевіряємо чи створювали ми вже базу раніше
    if(!await isExists(nameDb)) {
        // якщо ні, завантажуємо записи
        // цей блок коду буде запускатись тільки при першому відкритті
        const resp = await fetch('/data/db-products.json');
        const data = resp.ok ? await resp.json() : null;

        if(data && data.products) {
            productsList = data.products;
            // boolean неможливо індексувати. Тому, якщо потрібно індексувати 
            // "available", як варіант, можна використовувати "0" і "1"
            productsList.forEach(p => {
                // приводимо до number
                p.available = p.available+0;
                // фіксимо назву :-)
                p.name = p.names;
                delete p.names;
            });
        }
    }
    // створюємо базу
    createDb(productsList);
    // базу можна побачити в dev-tools браузера: 
    // application --> storage --> indexeddb --> coffee-shop_products-db
}
const ready = init();


// create:
const add = (arr) => ready.then(() => products.bulkPut(arr));
// read:
const getById = (id) => ready.then(() => products.get(id));
const getByArticle = (article) => ready.then(() => products.get({ article }));
const getAll = async (opts) => {
    await ready;
    let query = products;
    opts = getQueryOpts(opts);
    query = query.offset(opts.offset).limit(opts.limit);
    return query.toArray();
}
const get = async (request, opts) => {
    await ready;
    let query = products;
    opts = getQueryOpts(opts);
    /*
    if(request.name) {
        query.where('name'); 
    }
    */
    // функція недописана
}
// delete:
const deleteById = (id) => ready.then(() => products.delete(id));
const deleteByArticle = (article) => ready.then(() => products.delete(article));

export default {
    add,
    get,
    getAll,
    getById,
    getByArticle,
    deleteById,
    deleteByArticle
}