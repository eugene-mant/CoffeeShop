import { randomInt, randomBool } from './utils';

const categories = [
    'drink-coffee',
    'drink-chocolate',
    'drink-tea',
    'food-cookie',
    'food-cake',
    'food-donut'
];
const nameParts = [
    ['sweet', 'sour', 'salty', 'pungent', 'bitter', 'astringent'],
    ['cool', 'super', 'hot', 'nice', 'yummy'],
    ['choco', 'light', 'soft', 'big', 'milky']
];
const nameUnits = {
    drink: ['100ml', '120ml', '150ml', '200ml'],
    food: ['200g', '4p', '300g', '250g', '2p']
};

let productItemCount = 0;
export default () => {
    const category = categories[randomInt(0, categories.length-1)];
    const [ type, simpleName ] = category.split('-');

    const id = productItemCount++;
    let name = '';
    let article = type[0] + simpleName[0] + '-' + id;
    
    for(let arr of nameParts) {
        if(randomBool(70)) {
            let value = arr[randomInt(0, arr.length-1)];
            article += value[0];
            name += value + ' ';
        }
    }

    const nu = nameUnits[type];
    name += simpleName + ', ' + nu[randomInt(0, nu.length-1)];
    name = name[0].toUpperCase() + name.slice(1);
    article += '/' + randomInt(10, 99);
    
    return {
        id, 
        article, 
        name, 
        category, 
        price: randomInt(50, 200) * 100,
        available: randomBool(80)
    }
}