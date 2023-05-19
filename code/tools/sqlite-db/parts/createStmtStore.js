import StatementStore from './StatementStore';
import chainObjectCreator from '@code/utils/chainObjectCreator';

const props = {
	lazy: { value: true }
};
export const Scope = Symbol('scope');

let id = 1;
const dict = { __proto__: null };
const getScope = (mid) => dict[mid] || (dict[mid] = { __proto__: null });
const setStore = (mid, key, store) => getScope(mid)[key] = store;
const getStore = (mid, key, opts) => getScope(mid)[key] || createStore(opts);
const initMulti = (stmt, opts, fns) => {
    let key = stmt.key = opts.key || 'default';
    let mid = stmt.mid = opts.mid || id++;
    fns.getStore = (key) => getStore(mid, key, { ...opts, mid, key, db: stmt.db });
    fns.getStoreCollection = () => getScope(mid);
    fns.compile = (obj) => {
        let stores = getScope(mid);
        for(let store of stores) {
            store[Scope].compile(obj);
        }
    };
    return setStore(mid, key, stmt.store);
}
export default (opts={}) => {
    const stmt = new StatementStore(opts.db);
    const store = stmt.store;
    const fns = {
        add: (...args) => stmt.addArray(...args),
        compile: (obj) => stmt.compile(obj)
    };
    const chain = chainObjectCreator(props, {
        createKey: 'first',
        created: (item) => stmt.addItem(item),
    });
    const get = (t, key) => chain({})[key];
    store[Scope] = stmt;
    store.$ = new Proxy(store, { get });
    store.$m = fns;
    return opts.multi ? initMulti(stmt, opts, fns) : store;
}