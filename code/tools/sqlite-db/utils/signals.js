const signals = { __proto__: null };
export const signal = (key, ...args) => signals[key]?.forEach(s => s(...args));
export const signalOnce = (key, ...args) => {
    signals[key]?.forEach(s => s(...args));
    delete signals[key];
};
export const getSignal = (key) => signals[key] || createSignal(key);
export const createSignal = (key, alwaysApply) => {
    signals[key] = [];
    return (cb) => signals[key]?.push(cb) || (alwaysApply && cb());
}