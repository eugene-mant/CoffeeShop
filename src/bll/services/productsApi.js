import products from '~/bll/localDAL/none/products';

//#region пограємось у валідацію:
const isPrice = v => (typeof v === 'number' && v > 0);
const validator = {
    isAvailable: v => typeof v === 'boolean',
    price: isPrice,
    minPrice: isPrice,
    maxPrice: isPrice,
    category: v => typeof v === 'string'
};
const createProductsFilterParams = opts => {
    // додаємо тільки якщо властивість існує в opts і відповідає вимогам валідатора
    const filter = {};
    for(let key in opts) {
        if(validator[key]) {
            let item = opts[key];
            if(validator[key](item)) {
                filter[key] = item;
            }
        }
    }

    // якщо є конкретна ціна - вона в пріоритеті
    if(filter.price) {
        if(filter.minPrice) {
            delete filter.minPrice;
        }
        if(filter.maxPrice) {
            delete filter.maxPrice;
        }
    }
    // якщо немає ціни, перевіримо діапазон цін
    else {
        if(filter.minPrice && filter.maxPrice) {
            if(filter.minPrice > filter.maxPrice) {
                // мінімальна ціна більша за максимальну. 
                // фігня якаcь. поки, просто поміняємо місцями
                // абракадабра!
                [filter.minPrice, filter.maxPrice] = 
                [filter.maxPrice, filter.minPrice];

                // теж саме, що і з тимчасовою змінною 
                //let tmp = filter.minPrice;
                //filter.minPrice = filter.maxPrice;
                //filter.maxPrice = tmp;
            }
            else if(filter.minPrice === filter.maxPrice) {
                // вони рівні, значить це просто price
                filter.price = filter.minPrice;
                delete filter.minPrice;
                delete filter.maxPrice;
            }
        }
    }
    return filter;
}
//#endregion

const get = async (opts={}) => {
    // щоб було цікавіше, додамо "пошук" по параметрам
    const filter = createProductsFilterParams(opts);
    return products.get(filter);
}
export default { 
    getById: products.getById, 
    getByArticle: products.getByArticle, 
    get,
    getAll: products.getAll
}