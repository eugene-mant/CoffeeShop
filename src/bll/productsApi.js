import productsDb from '~/static/data/db-products.json';

/*
Фейковий API товарів
*/

// пограємось у валідацію:
const isPrice = v => (typeof v === 'number' && v > 0);
const validator = {
    isAvailable: v => typeof v === 'boolean',
    price: isPrice,
    minPrice: isPrice,
    maxPrice: isPrice,
    category: v => typeof v === 'string'
};

export default {
    /* 
        async нам не треба, але ми імітуємо асинхронну операцію, 
        тому нам потрібно, щоб повертався promise
    */  
    async getProductByArticle(article) {
        return productsDb.products.find(product => product.article === article);
    },
    async getProducts(opts={}) {
        // щоб було цікавіше, додамо "пошук" по параметрам
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

        console.log(filter)

        return productsDb.products.filter(product => {
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
    }
}

/*
В "~/dev/dev-plugin.js" я додав api в window, тому можеш попробувати його в консолі браузера
Наприклад, пару запитів:

api.getProducts({
	category: 'drink'
	
}).then(i => console.log(i));


api.getProducts({ 
	category: 'drink', 
	minPrice: 200, 
	maxPrice: 400 
	
}).then(i => console.log(i));


api.getProducts({ 
	category: 'drink',
	minPrice: 200, 
	maxPrice: 400,
	isAvailable: true
	
}).then(i => console.log(i));
*/