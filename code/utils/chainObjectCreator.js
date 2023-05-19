const KEY_VARS = { first: 0, once: 1, always: 2, none: 3 };
const NO_PROPS_VARS = { error: 0, ignore: 1, handler: 2, value: 3, none: 4 };

const addProp = function(pkey, prop, args) {
	let { key = pkey, value } = prop;
	if(args) {
		value = value(...args);
	}
	if(prop.end) {
		return this.setLastValue(key, value);
	}
	if(value !== undefined) {
		this.item[key] = value;
	}
	return this.proxy;
}
const setLastValue = function(key, value) {
	let result, item = this.item;
	if(value !== undefined) {
		item[key] = value;
	}
	if(this.created) {
		result = this.created(item, this);
	}
	//this.reset();
	return result === undefined ? item : result;
}
const reset = function(item={}) {
	this.item = this.initObj ? { ...this.initObj } : item;
}

const apply = (work, ths, args) => {
	return work.setLastValue(work.opts.nameOfValue, args);
}
const get = (work, key) => {
	const { opts, item } = work;
	const { createKey, nameOfKey } = opts; 
	if(createKey !== 0 || item[nameOfKey]) {
		const prop = work?.props[key];
		if(prop) {
			if(typeof prop.value === 'function' && !prop.notCall) {
				return function() { 
					return work.addProp(key, prop, arguments);
				}
			}
			return work.addProp(key, prop);
		}
	}
	if(createKey < 3 && (!item[nameOfKey] || createKey === 2)) {
		item[nameOfKey] = key;
		return work.proxy;
	}
	switch(opts.noPropReaction) {
		case 0: throw new Error(`Unknown property: "${key}"`);
		case 1: return work.proxy;
		case 2: return opts.noProp(key, work);
		case 3: 
			work.item[key] = opts.noProp;
			return work.proxy;
	}
}
const setOpts = (o, opts={}) => {
	o.nameOfValue = opts.nameOfValue ?? 'value';
	o.nameOfKey = opts.nameOfKey ?? 'key';
	o.createKey = KEY_VARS[opts.createKey ?? 'none'];
	o.noPropReaction = NO_PROPS_VARS[opts.noPropReaction ?? 'error'];
	o.noProp = opts.noProp ?? true;
}
const chainObjectCreator = (props, opts={}, item) => {
	const work = (item) => {
		work.reset(item);
		return work.proxy;
	};
	work.addProp = addProp.bind(work);
	work.reset = reset.bind(work);
	work.setLastValue = setLastValue.bind(work);
	work.proxy = new Proxy(work, { apply, get });
	work.props = props;
	work.created = opts.created;
	work.opts = {};
	setOpts(work.opts, opts);
	return item ? work(item) : work;
}
export default chainObjectCreator;