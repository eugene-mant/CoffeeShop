import lazyProp from '@code/utils/createLazyProperty';
import createConfig from './createConfig';
import createStmtStore from './createStmtStore';
import createTables from './createTables';
import createSql from './createSql';

//#region utils
const getExstTables = (db) => {
	const sql = 'SELECT name FROM sqlite_master WHERE type = "table"';
	const res = db.exec(sql);
	return res.length ? res[0].values.map(i => i[0]) : null;
}
const requiredQuery = (cfg) => {
    const map = {
        pageSize: 'page_size',
        journalMode: 'journal_mode'
    };
    let sql = '';
    for(let key in map) {
        if(key in cfg) {
            sql += `PRAGMA ${map[key]}=${cfg[key]};\n`;
        }
    }
    /*
	if(cfg.pageSize) {
		sql += `PRAGMA page_size=${cfg.pageSize};\n`;
	}
    */
	return sql;
};
const isGetter = (target, key) => {
	return Object.getOwnPropertyDescriptor(target, key)?.get;
}
//#endregion

const createInit = (defConfig, entryFunc) => {
    const compile = (db, config) => {
        const res = {};
        if(init.isProp('sql')) {
            init.sql.$m.compile({ db });
        }
        else if(config.autoCreate) {
            let sqlQuery = requiredQuery(config);
            if(sqlQuery) {
                db.run(sqlQuery);
            }
        }

        const tables = getExstTables(db);
        if(init.isProp('tables')) {
            init.tables.$m.compile({ db, ignoreKeys: tables });
        }
        db.tables = tables;
        db.isNew = !tables;
        
        if(init.isProp('stmt')) {
            const store = init.stmt;
            store.$m.compile({ db });
            res.stmtStore = store;
        }
        return res;
    };
	const init = (config, callback) => {
        if(config && typeof config === 'function') {
			callback = config;
			config = {};
		}
        config = init.config(config);
        entryFunc({ config, compile, callback });
    };
    init.config = createConfig(defConfig);
    init.isProp = (key) => !isGetter(init, key);
    lazyProp(init, 'sql', () => createSql());
    lazyProp(init, 'tables', () => createTables());
    lazyProp(init, 'stmt', () => createStmtStore());
    //lazyProp(init, 'funcs', () => ({}));
    return init;
};
export default createInit;