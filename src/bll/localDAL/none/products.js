let productsDb = [];
const init = async () => {
    const resp = await fetch('/data/db-products.json');
    productsDb = (await resp.json()).products;
};
const ready = init();

const getById = (id) => ready.then(() => productsDb.find(p => p.id === id));
const getByArticle = (a) => ready.then(() => productsDb.find(p => p.article === a));
const getAll = () => ready.then(() => productsDb.map(p => p));
const get = async (filter={}) => {
    await ready;
    // просто беремо масив усіх товарів і фільтрували по параметрах: 
    return productsDb.filter(product => {
        let i=0, j=0;
        for(let key in filter) {
            switch(key) {
                case 'price':
                    // якщо умова вірна дасть true
                    // true == 1, false == 0
                    j += (product.price === filter[key]);
                    break;
                case 'minPrice':
                    j += (product.price > filter[key]);
                    break;
                case 'maxPrice':
                    j += (product.price < filter[key]);
                    break;
                case 'category':
                    j += (product.category === filter[key]);
                    break;
                case 'isAvailable':
                    j += (product.available === filter[key]);
                    break;
            }
            i++;
        }
        // якщо кожна існуюча умова вірна, це наш товар
        return i === j;
    });
};

export default {
    getById,
    getByArticle,
    getAll,
    get
}