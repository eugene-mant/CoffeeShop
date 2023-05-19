import chainObjectCreator from '@code/utils/chainObjectCreator';
import { orderProps, itemsArrayToString } from './joinWithOrder';

const filterByIgnoreKeys = (items, ignoreKeys=[]) => {
	return items.filter(item => !ignoreKeys.includes(item.key));
}
export default () => {
    let queryStr, items = { __proto__: null };
	const fns = {
		add: (key, value) => items[key] = { ...value, key },
		compile({ db, ignoreKeys }) {
			let arr = Object.values(items);
			if(ignoreKeys) {
				arr = filterByIgnoreKeys(arr, ignoreKeys); 
			}
			queryStr = itemsArrayToString(arr);
			return db && queryStr ? db.run(queryStr) : queryStr;
		}
	};
	const chain = chainObjectCreator(orderProps, { 
        createKey: 'first', 
        created: (item) => {
			items[item.key] = item;
			return api;
		}
    });
	const api = new Proxy({}, { 
		get: (t, key) => key === '$m' ? fns : chain({ __proto__: null })[key]
	});
	return api;
}
/*
tables.$m.add('users', { value: '234234', first: 'sdf' });
tables.$m.compile({ db, list: [] });
*/