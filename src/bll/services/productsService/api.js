import createCover from '~/dev/fake-data/createCover';
import { createProductsFilterParams } from './utils';

// можна попробувати кожен з варіантів:
//import products from '~/bll/localDAL/none/products';
//import products from '~/bll/localDAL/indexeddb/products';
import products from '~/bll/localDAL/sqlite/client/products';

const get = async (opts={}) => {
    // щоб було цікавіше, додамо "пошук" по параметрам
    //const filter = createProductsFilterParams(opts);
    //return products.get(filter);
};
const getAll = async () => {
    let list = await products.getAll();
    return list.map(item => {
        // в базі у нас лінків на картинки немає
        // поки, просто згенеруємо кожному товару унікальну картинку
        item.image = createCover(item.name);
        return item;
    });
};

export default { 
    getById: products.getById, 
    getByArticle: products.getByArticle, 
    get,
    getAll
}