import { init, stmtStore as s } from '@code/tools/sqlite-db/index';

init.tables.products`
    CREATE TABLE products (
        id INTEGER PRIMARY KEY, 
        article TEXT NOT NULL UNIQUE,
        name TEXT,
        category TEXT,
        price INTEGER
    );
`;
const toProduct = (res) => !res || !res.length ? null : ({
	id: res[0], 
    article: res[1], 
    name: res[2], 
    category: res[3], 
    price: res[4]
});


s.$.insertProduct`
    INSERT 
	INTO products (article, name, category, price) 
		VALUES (?, ?, ?, ?);
`;
export const add = (arr) => {
	let res = true;
    const stmt = s.insertProduct;
    try {
        for(let item of arr) {
            stmt.run([item.article, item.name, item.category, item.price]);
        }
    }
    catch(e) {
        console.log('error', e);
        res = false;
    }
    finally {
        stmt.reset();
        return true;
    }
}

s.$.selProductsById`
    SELECT * FROM products WHERE id = ?
`;
export const getById = (id) => {
    const stmt = s.selProductsById;
    const res = stmt.get([id]);
    stmt.reset();
	return toProduct(res);
}

s.$.selProductsGetAll`
	SELECT * FROM products 
	LIMIT $limit OFFSET $offset
`;
export const getAll = (opts={}) => {
    const res = [];
    // тут ми вказуємо стартову позицію і ліміт по кількості об'єктів.
    // з цими параметрами, на клієнті можна легко зробити пагінацію
    // limit == -1 для необмеженої кількості
	const { limit: $limit = 20, offset: $offset = 0 } = opts;
    const stmt = s.selProductsGetAll;
    try {
		stmt.bind({ $limit, $offset });
        for(let i=0; stmt.step(); i++) {
            res[i] = toProduct(stmt.get());
        }
    }
    catch(e) {
        console.log('error', e);
    }
    finally {
        stmt.reset();
        return res;
    }
}