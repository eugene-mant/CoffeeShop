import initSqlJs from '@jlongster/sql.js';
import { SQLiteFS } from 'absurd-sql';
import IndexedDBBackend from 'absurd-sql/dist/indexeddb-backend';
import sqlWasm from '@jlongster/sql.js/dist/sql-wasm.wasm?init';

const fetchBackendFs = (type) => Promise.resolve(IndexedDBBackend);
const fetchSQLModule = (wasm = true) => Promise.resolve(sqlWasm);

export let SQL, SqlFs;
export const initSQL = async (opts={}) => {
    const wasm = true; // opts.wasm ?? true; 
    const backendFsType = 'indexeddb'; // opts.backendFsType ?? 'indexeddb';
    const [SqlLib, BackendFs] = await Promise.all([
        fetchSQLModule(wasm),
        fetchBackendFs(backendFsType)
    ]);

    SQL = await initSqlJs({ locateFile: () => SqlLib });
    SqlFs = new SQLiteFS(SQL.FS, new BackendFs());
    SQL.register_for_idb(SqlFs);
}
export const createDatabase = (path, sqlFs=SqlFs) => {
    const tmp = path.split('/');
    const name = tmp.pop();
    const dir = tmp.join('/');

    SQL.FS.mkdir(dir);
    SQL.FS.mount(sqlFs, {}, dir);
    return new SQL.Database(path, { filename: true });
}

let promise;
export default (opts) => {
	if(!promise) {
		promise = initSQL(opts);
	}
    return promise.then(() => ({ SQL, SqlFs, createDatabase }));
}