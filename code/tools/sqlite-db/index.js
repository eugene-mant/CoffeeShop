import loadLib from './sqlite-lib';
import createInit from './parts/createInit';
import joinTagTmpl from './utils/joinTagTmpl';
import { createSignal, signalOnce } from './utils/signals';

export const getLib = loadLib().then((obj) => {
	signalOnce('readySql');
	return obj;
});

export let tags;
export let db;
export const setDb = (value) => db = value; 
export const getDb = () => db;
export const readySql = createSignal('readySql');
export const ready = createSignal('ready', true);

const createTag = (key) => function(p) {
	const args = typeof p === 'string' 
		? arguments
		: p.length < 2 ? p[0] : joinTagTmpl(arguments);
		
	return db[key](args);
};
export const run = createTag('run');
export const exec = createTag('exec');
export const prepare = createTag('prepare');


const defaultConfig = {
	autoCreate: true,
	pathDb: '/sql/app-db.sqlite',
	pageSize: 8192,
	journalMode: 'MEMORY'
};
const entry = async (obj) => {
	let ctx;
	const { config, compile, callback } = obj;
	const { createDatabase: createDb } = await getLib;

	if(config.autoCreate) {
		db = createDb(config.pathDb);
		const res = compile(db, config);
		if(callback?.length) {
			ctx = { ...res, db, run, exec, prepare };
		}
	}
	else if(callback?.length) {
		ctx = { config, createDb, compile, setDb };
	}
	if(callback) {
		ctx ? callback(ctx) : callback();
	}
	signalOnce('ready', ctx);
};
export const init = createInit(defaultConfig, entry);
export const stmtStore = init.stmt;