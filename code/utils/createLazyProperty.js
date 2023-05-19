const createLazyProperty = (target, key, get, valid) => {
	Object.defineProperty(target, key, {
		configurable: true,
		get() {
			const value = get(key, this);
			valid = valid ? value !== undefined : true;
			if(valid) {
				delete this[key];
				return this[key] = value;
			}
		}
	});
}
export default createLazyProperty;