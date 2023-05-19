export const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max-min)) + min;
}
export const randomBool = (probPercent=50) => {
    return Math.random() < (probPercent / 100);
}
// генерує колір на основі тексту
// оригінал коду - https://gist.github.com/robertnsharp/49fd46a071a267d9e5dd
export const colorFromString = (str) => {
    str = str || Math.random()+'';
    let res = '#';
    let seed = str.charCodeAt(0);
    for(let i=1, l = str.length; i < l; i++) {
        seed = seed ^ str.charCodeAt(i);
    }
    for(let i=0; i < 3; i++) {
        let rand = Math.abs((Math.sin(seed+i) * 10000)) % 256;
        res += Math.round((rand + 128) / 2).toString(16);
    }
    return res;
}