import joinTagTmpl from '@code/tools/sqlite-db/utils/joinTagTmpl';
import createLazyProperty from '@code/utils/createLazyProperty'

class StatementStore {
    constructor(db) {
        this.db = db;
        this.store = { __proto__: null };
        this.lazy = { __proto__: null };
        this.pending = { __proto__: null };
    }
    addValue(key, value) {
        if(this.db) this.store[key] = this._prepare(value);
        else this.pending[key] = value;
    }
    addItem(item) {
        const { key, value, lazy: isLazy } = item;
        if(!isLazy) {
			return this.addValue(key, value);
        }
        const { store, lazy } = this;
		lazy[key] = value;
		createLazyProperty(store, key, (key) => {
			this.addValue(key, lazy[key]);
			delete lazy[key];
		});
    }
    addArray() {
        if(typeof arguments[0] === 'string') {
            const [key, value, mods = {}] = arguments;
            return this.addItem({ key, value, ...mods });
        }
        const [items, mods = {}] = arguments;
        for(let key in items) {
            const value = items[key];
            const newItem = typeof value === 'object'
                ? { key, ...mods, ...value }
                : { key, ...mods, value };
                
            this.addItem(newItem);
        }
    }
    compile({ db }) {
        const res = !!this._setDb(db);
		if(res) {
			const { store, pending } = this;
			for(let key in pending) {
				store[key] = this._prepare(pending[key]);
				delete pending[key];
			}
		}
        return res;
    }
	_setDb(db) {
		if(!this.db && this.db !== db) {
			this.db = db;
			return true;
		}
	}
	_prepare(args) {
		let p1 = args[0], p2;
		if(p1.raw) {
            p1 = p1.length < 2 ? p1[0] : joinTagTmpl(args);
        }
		else p2 = args[1];

        const stmt = this.db.prepare(p1, p2);
        //stmt.free();
		return stmt;
	}
}
export default StatementStore;