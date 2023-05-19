import chainObjectCreator from '@code/utils/chainObjectCreator';
import { orderProps, itemsArrayToString } from './joinWithOrder';

export default () => {
    let queryStr, items = [];
	const fns = { 
		add: (...args) => items.push({ value: args }),
		compile({ db }) {
			queryStr = itemsArrayToString(items);
			return db && queryStr ? db.run(queryStr) : queryStr;
		}
	};
    const created = (item) => (items.push(item), api);
	const chain = chainObjectCreator(orderProps, { created });
    
    const apply = (t, ths, args) => fns.add(...args);
    const get = (t, key) => key === '$m' ? fns : chain({ __proto__: null })[key];
	const api = new Proxy(() => {}, { apply, get });
	return api;
}