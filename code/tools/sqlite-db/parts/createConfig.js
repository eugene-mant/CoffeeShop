export default (def) => {
	let cfg;
	const defaultConfig = def || {};
	const set = (config={}) => cfg = { ...cfg, ...config };
	set.reset = () => cfg = { ...defaultConfig };
	set.reset();
	return set;
};